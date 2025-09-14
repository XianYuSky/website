document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 语言翻译数据 ---
    const translations = {
        'zh-CN': {
            pageTitle: "弦余",
            avatarAlt: "弦余",
            aboutMe: "关于我",
            aboutMeText: "欢迎来到我的个人主页。我是一名活跃在多个平台上的内容创作者，你可以在快手上找到我。",
            footerText: "&copy; 2025 弦余",
            toggleTheme: "切换主题",
            blogLink: "博客",
        },
        'zh-TW': {
            pageTitle: "弦余",
            avatarAlt: "弦余",
            aboutMe: "關於我",
            aboutMeText: "歡迎來到我的個人主頁。我是一名活躍在多個平台上的內容創作者，你可以在快手上找到我。",
            footerText: "&copy; 2025 弦余",
            toggleTheme: "切換主題",
            blogLink: "博客",
        },
        en: {
            pageTitle: "弦余",
            avatarAlt: "弦余",
            aboutMe: "About Me",
            aboutMeText: "Welcome to my homepage. I am a content creator active on multiple platforms. You can find me on 快手.",
            footerText: "&copy; 2025 弦余",
            toggleTheme: "Toggle Theme",
            blogLink: "Blog",
        },
        ja: {
            pageTitle: "弦余",
            avatarAlt: "弦余",
            aboutMe: "私について",
            aboutMeText: "私のホームページへようこそ。私は複数のプラットフォームで活動しているコンテンツクリエーターです。快手で私を見つけることができます。",
            footerText: "&copy; 2025 弦余",
            toggleTheme: "テーマ切り替え",
            blogLink: "ブログ",
        },
        ru: {
            pageTitle: "弦余",
            avatarAlt: "弦余",
            aboutMe: "Обо мне",
            aboutMeText: "Добро пожаловать на мою домашнюю страницу. Я создатель контента, активный на нескольких платформах. Вы можете найти меня на 快手.",
            footerText: "&copy; 2025 弦余",
            toggleTheme: "Сменить тему",
            blogLink: "Блог",
        }
    };

    // --- 2. 获取 DOM 元素 ---
    const langSwitcher = document.getElementById('lang-switcher');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');

    // --- 3. 侧边栏控制功能 ---
    const openSidebar = () => {
        if (mainNav && overlay && bodyEl) {
            mainNav.classList.add('open');
            overlay.classList.add('active');
            bodyEl.classList.add('no-scroll');
        }
    };

    const closeSidebar = () => {
        if (mainNav && overlay && bodyEl) {
            mainNav.classList.remove('open');
            overlay.classList.remove('active');
            bodyEl.classList.remove('no-scroll');
        }
    };

    if (menuToggle) { menuToggle.addEventListener('click', openSidebar); }
    if (closeMenu) { closeMenu.addEventListener('click', closeSidebar); }
    if (overlay) { overlay.addEventListener('click', closeSidebar); }


    // --- 4. 语言切换功能 ---
    const setLanguage = (lang) => {
        const langData = translations[lang];
        if (!langData) return;

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (langData[key]) {
                el.innerHTML = langData[key];
            }
        });
        
        document.querySelectorAll('[data-lang-key-alt]').forEach(el => {
            const key = el.getAttribute('data-lang-key-alt');
            if (langData[key]) {
                el.setAttribute('alt', langData[key]);
            }
        });

        document.title = langData.pageTitle;
        htmlEl.lang = lang;
        localStorage.setItem('preferredLanguage', lang);
    };

    // --- 5. 主题切换功能 ---
    const setTheme = (theme) => {
        if (theme === 'dark') {
            bodyEl.classList.add('dark-mode');
        } else {
            bodyEl.classList.remove('dark-mode');
        }
        localStorage.setItem('preferredTheme', theme);
    };
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = bodyEl.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    }

    // --- 6. 初始化 ---
    if (langSwitcher) {
        const savedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language;

        let initialLang = 'zh-CN';

        if (savedLang) {
            initialLang = savedLang;
        } else if (translations[browserLang]) {
            initialLang = browserLang;
        } else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) {
            initialLang = 'zh-TW';
        } else if (browserLang.startsWith('zh')) {
            initialLang = 'zh-CN';
        } else if (browserLang.startsWith('ru')) {
            initialLang = 'ru';
        } else if (browserLang.startsWith('ja')) {
            initialLang = 'ja';
        } else if (browserLang.startsWith('en')) {
            initialLang = 'en';
        }
        
        langSwitcher.value = initialLang;
        setLanguage(initialLang);

        langSwitcher.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    const savedTheme = localStorage.getItem('preferredTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = 'light';
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (prefersDark) {
        initialTheme = 'dark';
    }
    setTheme(initialTheme);
});
