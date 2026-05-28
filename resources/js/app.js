function applyKefaaTheme(mode = null) {
    const selectedMode = mode || localStorage.getItem('kefaa-theme') || 'light';

    document.documentElement.classList.remove('dark');

    if (selectedMode === 'dark') {
        document.documentElement.classList.add('dark');
    }

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

document.addEventListener('DOMContentLoaded', () => {
    applyKefaaTheme();
});

document.addEventListener('livewire:navigated', () => {
    applyKefaaTheme();
});
/* Mobile / tablet hamburger menu for KIFAA app pages */
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.kifaa-sidebar');

    if (!sidebar || document.querySelector('.kifaa-mobile-menu-btn')) {
        return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'kifaa-mobile-menu-btn';
    button.setAttribute('aria-label', 'Open navigation menu');
    button.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'kifaa-mobile-menu-overlay';

    document.body.appendChild(button);
    document.body.appendChild(overlay);

    const openMenu = () => {
        document.documentElement.classList.add('kifaa-menu-open');
        button.setAttribute('aria-label', 'Close navigation menu');
    };

    const closeMenu = () => {
        document.documentElement.classList.remove('kifaa-menu-open');
        button.setAttribute('aria-label', 'Open navigation menu');
    };

    const toggleMenu = () => {
        document.documentElement.classList.contains('kifaa-menu-open')
            ? closeMenu()
            : openMenu();
    };

    button.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    sidebar.querySelectorAll('a, button').forEach((item) => {
        item.addEventListener('click', closeMenu);
    });
});

document.addEventListener('livewire:navigated', () => {
    document.documentElement.classList.remove('kifaa-menu-open');
});


