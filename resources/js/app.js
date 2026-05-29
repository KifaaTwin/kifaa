function applyKefaaTheme(mode = null) {
    const selectedMode = mode || localStorage.getItem('kefaa-theme') || 'light';
    document.documentElement.classList.remove('dark');

    if (selectedMode === 'dark') document.documentElement.classList.add('dark');

    if (selectedMode === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    }
}

window.setKefaaTheme = function (mode) {
    localStorage.setItem('kefaa-theme', mode);
    applyKefaaTheme(mode);
};

function initKifaaMobileNav() {
    const sidebar = document.querySelector('.kifaa-sidebar');
    if (!sidebar) return;

    document.querySelector('.kifaa-mobile-toggle')?.remove();
    document.querySelector('.kifaa-mobile-screen')?.remove();

    const links = Array.from(sidebar.querySelectorAll('.kifaa-link')).map((link) => ({
        href: link.getAttribute('href') || '#',
        label: link.querySelector('.kifaa-text')?.textContent?.trim() || link.textContent?.trim() || 'Menu',
        active: link.classList.contains('active'),
        icon: link.querySelector('.kifaa-icon')?.innerHTML || ''
    }));

    const userName = sidebar.querySelector('.kifaa-user .kifaa-text')?.textContent?.trim() || 'Account';
    const logoutForm = sidebar.querySelector('.kifaa-logout-form');
    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'kifaa-mobile-toggle';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const screen = document.createElement('div');
    screen.className = 'kifaa-mobile-screen';
    screen.innerHTML = `
        <div class="kifaa-mobile-backdrop"></div>
        <aside class="kifaa-mobile-drawer" aria-label="Mobile navigation">
            <div class="kifaa-mobile-head">
                <div class="kifaa-mobile-logo-wrap">
                    <img src="/images/kifaa-logo.png" alt="KIFAA" class="kifaa-mobile-logo" onerror="this.style.display='none'">
                </div>
                <div>
                    <div class="kifaa-mobile-title">Kifaa</div>
                    <div class="kifaa-mobile-subtitle">Career Twin</div>
                </div>
            </div>

            <div class="kifaa-mobile-list">
                ${links.map((item) => `
                    <a class="kifaa-mobile-item ${item.active ? 'is-active' : ''}" href="${item.href}">
                        <span class="kifaa-mobile-icon">${item.icon || '•'}</span>
                        <span>${item.label}</span>
                    </a>
                `).join('')}
            </div>

            <div class="kifaa-mobile-footer">
                <div class="kifaa-mobile-account">
                    <span class="kifaa-mobile-avatar">${userName.charAt(0).toUpperCase()}</span>
                    <span>
                        <strong>${userName}</strong>
                        <small>Account settings</small>
                    </span>
                </div>

                <form class="kifaa-mobile-logout-form" action="${logoutForm?.getAttribute('action') || '/logout'}" method="${logoutForm?.getAttribute('method') || 'POST'}">
                    ${csrf ? `<input type="hidden" name="_token" value="${csrf}">` : ''}
                    <button type="submit" class="kifaa-mobile-logout">
                        <span>↪</span>
                        <strong>Log Out</strong>
                    </button>
                </form>
            </div>
        </aside>
    `;

    document.body.appendChild(toggle);
    document.body.appendChild(screen);

    const closeMenu = () => document.documentElement.classList.remove('kifaa-mobile-open');
    const openMenu = () => document.documentElement.classList.add('kifaa-mobile-open');

    toggle.addEventListener('click', () => {
        document.documentElement.classList.contains('kifaa-mobile-open') ? closeMenu() : openMenu();
    });

    screen.querySelector('.kifaa-mobile-backdrop')?.addEventListener('click', closeMenu);
    screen.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

document.addEventListener('DOMContentLoaded', () => {
    applyKefaaTheme();
    initKifaaMobileNav();
});

document.addEventListener('livewire:navigated', () => {
    applyKefaaTheme();
    document.documentElement.classList.remove('kifaa-mobile-open');
    initKifaaMobileNav();
});
