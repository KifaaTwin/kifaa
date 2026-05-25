# Kifa’a - Digital Twin Career Platform

Kifa’a is a Laravel-based Digital Twin career platform that helps users analyze their CV, extract skills, identify missing market skills, recommend courses, and track career readiness.

---

## Features

- User authentication
- CV upload and analysis
- PDF and DOCX CV support
- AI-based job title and skill extraction
- AI-based market skill generation
- Weekly job market skills sync
- Newly in-demand skill badge in the Digital Twin dashboard
- Missing skill detection
- Digital Twin readiness score
- Dashboard with skill statistics and charts
- Course recommendations for missing skills
- Skill impact simulation
- Course completion tracking
- Career profile editing
- CV re-analysis
- Light and dark appearance mode

---

## Technologies Used

- Laravel
- PHP
- MySQL
- Blade
- Livewire / Volt
- Flux UI
- Tailwind CSS
- Vite
- JavaScript
- OpenAI API

---

## Requirements

Before running the project, make sure the following tools are installed:

- PHP 8.2 or higher
- Composer
- Node.js
- npm
- MySQL
- Git



## Installation

### 1. Open the project folder

If the project is downloaded as a ZIP file, extract it first.

Then open the extracted project folder in the terminal.

The terminal should be inside the main project folder, where these files exist:

```text
artisan
composer.json
package.json
.env.example
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Create the environment file

For macOS or Linux:

```bash
cp .env.example .env
```

For Windows:

```bash
copy .env.example .env
```

### 5. Generate the application key

```bash
php artisan key:generate
```

### 6. Configure the database

Create a MySQL database.

Example database name:

```sql
CREATE DATABASE Kifaa;
```

Then open the `.env` file and update the database settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=Kifaa
DB_USERNAME=root
DB_PASSWORD=
```

Update `DB_USERNAME` and `DB_PASSWORD` based on your local MySQL setup.

### 7. Configure OpenAI API keys

The project uses OpenAI for:

- CV analysis
- Weekly job market skills sync
- Course recommendation search

Add the following values to the `.env` file:

```env
OPENAI_CV_KEY=your_openai_key_here
OPENAI_JOB_MARKET_KEY=your_openai_key_here
OPENAI_COURSE_RECOMMENDATION_KEY=your_openai_key_here

OPENAI_MODEL=gpt-4.1-mini
OPENAI_URL=https://api.openai.com/v1/responses
```

Do not share real OpenAI keys inside GitHub, `.env.example`, public ZIP files, or source code files.

### 8. Run database migrations

```bash
php artisan migrate
```

If the project includes seeders, run:

```bash
php artisan migrate --seed
```

### 9. Create the storage link

```bash
php artisan storage:link
```

---

## Running the Project

Open two terminal windows inside the project folder.

### Terminal 1: Start the frontend server

```bash
npm run dev
```

Keep this terminal running.

### Terminal 2: Start the Laravel server

```bash
php artisan serve
```

Then open the project in the browser:

```text
http://127.0.0.1:8000
```

---

## Build for Production

To build frontend assets for production:

```bash
npm run build
```

---

## Supported CV File Types

The system supports:

- PDF
- DOCX



## Main User Flow

1. Register or log in.
2. Upload a CV file.
3. Review the extracted job title and skills.
4. Confirm the career profile.
5. View the Digital Twin dashboard.
6. Check current skills and missing skills.
7. Open recommended courses for missing skills.
8. Simulate the impact of learning a missing skill.
9. Mark a skill as completed.
10. Re-analyze the CV when needed.
11. Edit the career profile manually if needed.
12. Weekly job market sync updates newly in-demand missing skills.

---

## Weekly Job Market Skills Sync

The system includes a weekly job market sync feature.

Every week, Kifa’a checks the user's selected career interest, searches for newly in-demand skills in the job market, and compares them with the user's current skills and existing missing skills.

If a skill is new and the user does not already have it, the system adds it to the missing skills list and marks it as:

```text
Newly in demand
```

The sync command is:

```bash
php artisan skills:sync-job-market
```

The command is scheduled in `routes/console.php`:

```php
Schedule::command('skills:sync-job-market')->weeklyOn(1, '09:00');
```

This runs the sync every Monday at 9:00 AM.

---

## Important Project Notes

The real `.env` file is not included because it contains private configuration and API keys.

Use `.env.example` as a template for creating a local `.env` file.

The following folders are not included when sharing the project through GitHub:

```text
vendor/
node_modules/
```

They can be installed again using:

```bash
composer install
npm install
```

---

## Useful Commands

Clear Laravel cache:

```bash
php artisan optimize:clear
```

Run migrations from scratch:

```bash
php artisan migrate:fresh
```

Run migrations from scratch with seeders:

```bash
php artisan migrate:fresh --seed
```

Start Laravel server:

```bash
php artisan serve
```

Start Vite development server:

```bash
npm run dev
```

Build frontend assets:

```bash
npm run build
```

Create storage link:

```bash
php artisan storage:link
```

Run weekly job market sync manually:

```bash
php artisan skills:sync-job-market
```

Run Laravel scheduler locally:

```bash
php artisan schedule:work
```

---

### 6. Changes are not showing

Clear Laravel cache:

```bash
php artisan optimize:clear
```

Then refresh the browser.

---

### 7. AI features are not working

Make sure the OpenAI keys are added correctly in the `.env` file:

```env
OPENAI_CV_KEY=your_openai_key_here
OPENAI_JOB_MARKET_KEY=your_openai_key_here
OPENAI_COURSE_RECOMMENDATION_KEY=your_openai_key_here

OPENAI_MODEL=gpt-4.1-mini
OPENAI_URL=https://api.openai.com/v1/responses
```

Without valid OpenAI keys, the application can run, but AI-based features such as CV analysis, weekly job market sync, and course recommendations will not work.

---

## Project Structure

Important folders:

```text
app/
    Http/Controllers/
    Models/
    Services/
    Console/Commands/

resources/
    views/
    css/
    js/

routes/
    web.php
    console.php

database/
    migrations/

public/
    images/
```

Main project logic is organized into:

- Controllers for handling requests
- Services for business logic and AI calls
- Models for database relationships
- Commands for scheduled tasks
- Blade files for user interface pages

---

## License

This project was developed as a graduation project.