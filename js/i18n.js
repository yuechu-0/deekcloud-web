// js/i18n.js
document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
    let currentLang = localStorage.getItem('deekcloud_lang') || defaultLang;

    window.applyLanguage = function(lang) {
        currentLang = lang;
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        localStorage.setItem('deekcloud_lang', lang);

        // 静态 DOM 替换
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keys = el.getAttribute('data-i18n').split('.');
            let text = window.translations[lang];
            for (let k of keys) {
                if (text === undefined || text === null) break;
                text = text[k];
            }
            if (text) {
                if (/<[a-z][\s\S]*>/i.test(text)) {
                    el.innerHTML = text;
                } else {
                    el.innerText = text;
                }
            }
        });

        // 顶栏切换按钮状态更新
        const langSwitchTexts = document.querySelectorAll('.lang-switch-text');
        langSwitchTexts.forEach(el => {
            el.innerText = lang === 'zh' ? 'EN' : '中文';
        });

        // 触发自定义事件，通知各页面重新渲染动态数据
        const event = new CustomEvent('languageChanged', { detail: { lang: currentLang } });
        window.dispatchEvent(event);
    }

    // 初始化语言
    applyLanguage(currentLang);

    // 全局切换方法
    window.toggleLanguage = function() {
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        applyLanguage(newLang);
    };

    // 全局翻译获取方法 (用于 JS 动态渲染)
    window.t = function(keyPath) {
        const keys = keyPath.split('.');
        let text = window.translations[currentLang];
        for (let k of keys) {
            if (text === undefined || text === null) return keyPath;
            text = text[k];
        }
        return text || keyPath;
    };
    
    window.getCurrentLang = function() {
        return currentLang;
    };
});