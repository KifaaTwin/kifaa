<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class JobMarketSkillService
{
    /**
     * Gets the latest in-demand skills for a target job role.
     *
     * The method sends the selected role to OpenAI with web search enabled,
     * expects a JSON list of market skills, then cleans and de-duplicates
     * the returned skills before passing them back to the application.
     *
     * @param  string  $role
     * @return array
     */
    public function getLatestSkillsForRole(string $role): array
    {
        $apiKey = config('services.openai.job_market_key');

        if (! $apiKey) {
            return [];
        }

        $prompt = <<<PROMPT
You are a job market skills analysis agent.

Find the latest in-demand skills in the job market for this role:

Role: {$role}

Return ONLY valid JSON.
No markdown.
No explanation.

Format:
[
  {
    "skill": "Skill name",
    "reason": "Short reason why this skill is currently important in the job market"
  }
]

Rules:
- Return maximum 8 skills.
- Include technical and soft skills if relevant.
- Avoid generic skills like communication unless strongly role-specific.
- Keep skill names short.
PROMPT;

        $response = Http::withToken($apiKey)
            ->timeout(60)
            ->post('https://api.openai.com/v1/responses', [
                'model' => 'gpt-4.1-mini',
                'tools' => [
                    [
                        'type' => 'web_search_preview',
                    ],
                ],
                'input' => $prompt,
            ]);

        if (! $response->successful()) {
            return [];
        }

        $data = $response->json();

        $text = $this->extractOutputText($data);

        $skills = json_decode($text, true);

        if (! is_array($skills)) {
            return [];
        }

        return collect($skills)
            ->filter(fn ($item) => is_array($item) && ! empty($item['skill']))
            ->map(fn ($item) => [
                'skill' => trim($item['skill']),
                'reason' => $item['reason'] ?? 'This skill is currently in demand in the job market.',
            ])
            ->unique(fn ($item) => strtolower($item['skill']))
            ->values()
            ->toArray();
    }

    /**
     * Extracts text output from the OpenAI Responses API result.
     *
     * The response may contain output_text directly or nested message content.
     * This helper supports both response structures and returns one clean text
     * string that can be decoded as JSON.
     *
     * @param  array  $data
     * @return string
     */
    private function extractOutputText(array $data): string
    {
        if (! empty($data['output_text'])) {
            return trim((string) $data['output_text']);
        }

        $text = '';

        foreach ($data['output'] ?? [] as $output) {
            foreach ($output['content'] ?? [] as $content) {
                if (($content['type'] ?? null) === 'output_text') {
                    $text .= (string) ($content['text'] ?? '');
                }
            }
        }

        return trim($text);
    }
}