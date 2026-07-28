// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== 移动端菜单 =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// 点击导航链接后关闭菜单
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== 项目数据 =====
const projects = [
    {
        name: 'cache_sim',
        desc: 'Cache 模拟器 — 模拟多级缓存层次结构，支持多种映射方式和替换策略。',
        url: 'https://github.com/Lionoskay/cache_sim',
        lang: 'C++',
        langColor: '#f34b7d'
    },
    {
        name: 'tomasulo_sim',
        desc: 'Tomasulo 算法模拟器 — 用 Python 实现的 Tomasulo 动态调度算法核心结构。',
        url: 'https://github.com/Lionoskay/tomasulo_sim',
        lang: 'Python',
        langColor: '#3572A5'
    },
    {
        name: 'five_stage_pipeline',
        desc: '五级流水线 CPU 设计 — 包含取指、译码、执行、访存、写回的完整流水线实现。',
        url: 'https://github.com/Lionoskay/five_stage_pipeline',
        lang: 'Verilog',
        langColor: '#b2b7f8'
    },
    {
        name: 'MCM_2026',
        desc: '美国大学生数学建模竞赛 (MCM) 2026 参赛代码与建模工作。',
        url: 'https://github.com/Lionoskay/MCM_2026',
        lang: 'Python',
        langColor: '#3572A5'
    },
    {
        name: 'Learning-resources',
        desc: 'FPGA、PCB 设计与嵌入式系统学习资料合集。',
        url: 'https://github.com/Lionoskay/Learning-resources',
        lang: 'Docs',
        langColor: '#083fa1'
    },
    {
        name: 'Code-and-Lab',
        desc: '课程实验代码与课后练习集合。',
        url: 'https://github.com/Lionoskay/Code-and-Lab',
        lang: 'Mixed',
        langColor: '#94a3b8'
    }
];

// ===== 渲染项目卡片 =====
const projectGrid = document.getElementById('projectGrid');
projects.forEach((p, i) => {
    const card = document.createElement('a');
    card.href = p.url;
    card.target = '_blank';
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
        <div class="project-header">
            <span class="project-name">${p.name}</span>
            <span class="project-external"><i class="fas fa-external-link-alt"></i></span>
        </div>
        <p class="project-desc">${p.desc}</p>
        <span class="project-lang">
            <span class="lang-dot" style="background:${p.langColor}"></span>
            ${p.lang}
        </span>
    `;
    projectGrid.appendChild(card);
});

// ===== 数字计数动画 =====
const statNums = document.querySelectorAll('.stat-num');
const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
};

// ===== 滚动出现动画 (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // 触发数字动画
            if (entry.target.classList.contains('stat-card')) {
                const num = entry.target.querySelector('.stat-num');
                if (num && !num.dataset.animated) {
                    num.dataset.animated = 'true';
                    animateCounter(num);
                }
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 为需要动画的元素添加 reveal 类
document.querySelectorAll('.section-header, .skill-category, .project-card, .about-text, .about-stats .stat-card, .contact-content').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// 统计卡片特殊处理
document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// ===== 年份 =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== 平滑滚动 (导航栏偏移) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});
