// js/mobile.js
document.addEventListener('DOMContentLoaded', () => {

    // === 1. 自动高亮当前页面的导航项 (桌面端 + 移动端) ===
    // 获取当前页面的文件名，默认为 index.html
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === '') currentPage = 'index.html';

    // 桌面端导航高亮自动分配
    const desktopLinks = document.querySelectorAll('nav .hidden.md\\:flex.space-x-8 a');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.className = 'inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium text-primary transition-all duration-300';
        } else {
            link.className = 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all duration-300';
        }
        link.style.textDecoration = 'none';
    });

    // 移动端下拉菜单高亮自动分配 (精确还原截图效果)
    const mobileLinks = document.querySelectorAll('#mobile-menu-content a');
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            // 选中状态：主色调文字 + 极浅的主色调背景
            link.className = 'block w-full px-6 py-4 text-base font-medium text-primary bg-indigo-50/50 border-b border-gray-100 transition-colors';
        } else {
            // 未选中状态：深灰文字 + 白色背景
            link.className = 'block w-full px-6 py-4 text-base font-medium text-gray-800 bg-white hover:bg-gray-50 border-b border-gray-100 transition-colors';
        }
    });

    // === 2. 移动端下拉导航菜单逻辑 (下拉/淡入风格) ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuLine1 = document.getElementById('menu-line-1');
    const menuLine2 = document.getElementById('menu-line-2');
    const menuLine3 = document.getElementById('menu-line-3');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // 展开菜单
            mobileMenuContent.classList.remove('max-h-0', 'opacity-0');
            mobileMenuContent.classList.add('max-h-[400px]', 'opacity-100');
            mobileMenuOverlay.classList.remove('hidden');
            
            // 汉堡变叉号动画
            menuLine1.classList.add('rotate-45', 'translate-y-0');
            menuLine1.classList.remove('-translate-y-1.5');
            menuLine2.classList.add('opacity-0');
            menuLine3.classList.add('-rotate-45', 'translate-y-0');
            menuLine3.classList.remove('translate-y-1.5');
        } else {
            // 收起菜单
            mobileMenuContent.classList.add('max-h-0', 'opacity-0');
            mobileMenuContent.classList.remove('max-h-[400px]', 'opacity-100');
            mobileMenuOverlay.classList.add('hidden');
            
            // 叉号变回汉堡动画
            menuLine1.classList.remove('rotate-45', 'translate-y-0');
            menuLine1.classList.add('-translate-y-1.5');
            menuLine2.classList.remove('opacity-0');
            menuLine3.classList.remove('-rotate-45', 'translate-y-0');
            menuLine3.classList.add('translate-y-1.5');
        }
    }

    if (mobileMenuBtn && mobileMenuContent) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        // 点击空白透明区域也会关闭菜单
        if(mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', toggleMenu);
        }
    }

    // === 3. 底部社交面板 (Bottom Sheet) 逻辑 ===
    const socialSheetToggle = document.getElementById('mobile-social-toggle');
    const socialSheet = document.getElementById('mobile-social-sheet');
    const socialSheetOverlay = document.getElementById('mobile-social-overlay');
    const socialSheetContent = document.getElementById('mobile-social-content');

    function closeSocialSheet() {
        if(!socialSheetContent || !socialSheetOverlay || !socialSheet) return;
        socialSheetContent.classList.add('translate-y-full');
        socialSheetOverlay.classList.remove('opacity-100');
        socialSheetOverlay.classList.add('opacity-0');
        setTimeout(() => {
            socialSheet.classList.add('hidden');
        }, 300);
    }

    function openSocialSheet() {
        if(!socialSheetContent || !socialSheetOverlay || !socialSheet) return;
        socialSheet.classList.remove('hidden');
        void socialSheet.offsetWidth; // 触发重绘
        socialSheetOverlay.classList.remove('opacity-0');
        socialSheetOverlay.classList.add('opacity-100');
        socialSheetContent.classList.remove('translate-y-full');
    }

    if (socialSheetToggle && socialSheet && socialSheetOverlay) {
        socialSheetToggle.addEventListener('click', openSocialSheet);
        socialSheetOverlay.addEventListener('click', closeSocialSheet);
    }
});