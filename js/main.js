/**
 * ============================================================================
 * RESUME WEBSITE - JAVASCRIPT CONTROLLER
 * Igor Plakhov | Kotlin Android & Desktop Developer
 * Features: Dark/Light Mode, RU/EN Switcher, Interactive Modals,
 *           Code Viewer, Copy Toast, Live Clock & Smooth Nav
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initNavigation();
  initCopyFeatures();
  initSkillsFilter();
  initCodeViewer();
  initProjectsModal();
  initMoscowClock();
  initQuickContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('site-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Тёмная тема включена' : 'Светлая тема включена');
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
  }
}

/* ==========================================================================
   2. Bilingual Localization (RU / EN)
   ========================================================================== */
let currentLang = 'ru';

function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');

  const savedLang = localStorage.getItem('site-lang') || 'ru';
  applyLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const targetLang = currentLang === 'ru' ? 'en' : 'ru';
      applyLanguage(targetLang);
      showToast(targetLang === 'ru' ? 'Язык переключен на Русский' : 'Language switched to English');
    });
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site-lang', lang);
    document.documentElement.lang = lang;

    if (langLabel) {
      langLabel.textContent = lang === 'ru' ? 'EN' : 'RU';
    }

    // Translate all elements with data-ru and data-en
    const translatableElements = document.querySelectorAll('[data-ru][data-en]');
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.textContent = text;
      }
    });

    // Update Document Title
    if (lang === 'ru') {
      document.title = 'Игорь Плахов — Kotlin Android & Desktop Developer | Резюме';
    } else {
      document.title = 'Igor Plakhov — Kotlin Android & Desktop Developer | Resume';
    }
  }
}

/* ==========================================================================
   3. Header Navigation, ScrollSpy & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }

  // Scrollspy to highlight active link
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Header shadow on scroll
    if (header) {
      if (scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.35)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
  });
}

/* ==========================================================================
   4. Copy to Clipboard & Toast Notifications
   ========================================================================== */
function initCopyFeatures() {
  // Elements with data-copy attribute
  const copyables = document.querySelectorAll('[data-copy]');
  copyables.forEach(item => {
    item.addEventListener('click', (e) => {
      const text = item.getAttribute('data-copy');
      const isPhone = item.getAttribute('data-type') === 'phone' || (text && text.startsWith('+7'));
      const isMobile = window.matchMedia('(max-width: 900px)').matches || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

      // On mobile devices, phone links directly invoke the native dialer
      if (isPhone && isMobile) {
        return;
      }

      e.preventDefault();
      if (text) {
        copyToClipboard(text);
      }
    });
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(currentLang === 'ru' ? `Скопировано: ${text}` : `Copied: ${text}`);
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(currentLang === 'ru' ? `Скопировано: ${text}` : `Copied: ${text}`);
  } catch (err) {
    showToast(currentLang === 'ru' ? 'Не удалось скопировать' : 'Failed to copy');
  }
  document.body.removeChild(textArea);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   5. Skills Category Filtering
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Code Viewer Tabs & Code Copy
   ========================================================================== */
function initCodeViewer() {
  const tabs = document.querySelectorAll('.code-tab');
  const blocks = document.querySelectorAll('.code-block');
  const copyBtn = document.getElementById('copyCodeBtn');
  const copyText = document.getElementById('copyCodeText');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      blocks.forEach(b => b.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `code-${tab.getAttribute('data-tab')}`;
      const targetBlock = document.getElementById(targetId);
      if (targetBlock) {
        targetBlock.classList.add('active');
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activeBlock = document.querySelector('.code-block.active');
      if (activeBlock) {
        copyToClipboard(activeBlock.innerText);
        if (copyText) {
          const original = copyText.textContent;
          copyText.textContent = 'Copied!';
          setTimeout(() => { copyText.textContent = original; }, 2000);
        }
      }
    });
  }
}

/* ==========================================================================
   7. Project Detail Modal
   ========================================================================== */
const projectDetails = {
  codenames: {
    title: 'Codenames',
    tag: 'Compose Multiplatform • Kotlin',
    ru: {
      title: 'Codenames — Настольная игра',
      tag: 'Compose Multiplatform • Kotlin',
      desc: 'Полнофункциональная настольная версия культовой игры Codenames, разработанная на Compose Multiplatform (Desktop) с возможностью запуска на Android.',
      highlights: [
        'Разделение на роли Капитана (с подсказками) и Полевых агентов с синхронизацией игрового поля.',
        'Кастомная векторная отрисовка и плавная 3D-анимация переворота карточек на Jetpack Compose.',
        'Архитектура MVI: строго детерминированное состояние раунда, исключающее рассинхронизацию ходов.',
        'Поддержка горячих клавиш и адаптивного масштабирования под любые разрешения мониторов.'
      ],
      stack: 'Kotlin, Compose Multiplatform, Coroutines, StateFlow, MVI'
    },
    en: {
      title: 'Codenames Desktop & Mobile',
      tag: 'Compose Multiplatform • Kotlin',
      desc: 'Full-featured digital adaptation of the popular Codenames game built on Compose Multiplatform targeting Desktop and Android.',
      highlights: [
        'Role-based views for Spymasters and Operatives with real-time field state synchronization.',
        'Custom vector rendering and fluid card flip animations implemented via Jetpack Compose animation APIs.',
        'MVI architecture ensuring deterministic game state cycles without race conditions.',
        'Desktop keyboard shortcuts support and responsive layouts for various screen dimensions.'
      ],
      stack: 'Kotlin, Compose Multiplatform, Coroutines, StateFlow, MVI'
    },
    github: 'https://github.com/AdisAlagic/CodenamesProject'
  },
  tuticalendar: {
    title: 'TutiCalendar',
    tag: 'Android • Jetpack Compose • 🔒 Closed Source',
    closed: true,
    ru: {
      title: 'TutiCalendar — Планировщик кондитерской',
      tag: 'Android • Jetpack Compose • 🔒 Закрытый проект',
      desc: 'Специализированное мобильное приложение для кондитерской студии (коммерческий закрытый проект). Решает задачу учёта сроков изготовления десертов и планирования цеха.',
      highlights: [
        'Статус: 🔒 Closed Source (Коммерческая разработка под NDA).',
        'Интерактивная сетка календаря с цветовой индикацией загруженности каждого дня.',
        'Офлайн-хранение и кэширование на Room ORM с реактивными Flow-запросами.',
        'Быстрое создание заказа: расчёт веса, начинки, дедлайна и предоплаты.',
        'Уведомления о приближающихся дедлайнах отдачи заказов.'
      ],
      stack: 'Kotlin, Jetpack Compose, Room ORM, Clean Architecture, Kotlin Flow'
    },
    en: {
      title: 'TutiCalendar — Confectionery Planner',
      tag: 'Android • Jetpack Compose • 🔒 Closed Source',
      desc: 'Specialized enterprise mobile assistant for a confectionery studio (proprietary commercial project). Solves order deadline tracking and kitchen schedule planning.',
      highlights: [
        'Status: 🔒 Closed Source (Commercial project under NDA).',
        'Interactive custom calendar grid with daily capacity color indicators.',
        'Offline-first architecture with Room ORM providing instant Flow updates.',
        'Rapid order entry: ingredient tracking, weight calculation, and deadline alarms.',
        'Push reminders for urgent preparation steps.'
      ],
      stack: 'Kotlin, Jetpack Compose, Room ORM, Clean Architecture, Kotlin Flow'
    },
    github: 'https://github.com/AdisAlagic'
  },
  kutube: {
    title: 'KuTube Client',
    tag: 'Jetpack Compose • ExoPlayer • 🚧 В разработке',
    inDev: true,
    ru: {
      desc: 'Легковесный альтернативный клиент YouTube с упором на скорость и чистый декларативный интерфейс (проект активно в разработке).',
      highlights: [
        'Статус: 🚧 В активной разработке (WIP).',
        'Кастомная обёртка вокруг ExoPlayer (Media3) с поддержкой жестов яркости и громкости.',
        'Оптимизированные списки на LazyColumn с асинхронным кэшированием превью.',
        'Фоновое воспроизведение звука и управление через системные медиа-уведомления.',
        'Отсутствие лишних зависимостей — мгновенный запуск и низкое потребление батареи.'
      ],
      stack: 'Kotlin, Jetpack Compose, Media3 (ExoPlayer), Coroutines, Retrofit'
    },
    en: {
      desc: 'Minimalist, fast alternative YouTube client focused on performance and distraction-free playback (actively in development).',
      highlights: [
        'Status: 🚧 Actively in Development (WIP).',
        'Custom ExoPlayer/Media3 integration with swipe gestures for volume and brightness.',
        'High-performance LazyColumn lists with memory-efficient thumbnail caching.',
        'Background audio streaming connected to Android media session notification.',
        'Ultra-lightweight bundle size with instant launch times.'
      ],
      stack: 'Kotlin, Jetpack Compose, Media3 (ExoPlayer), Coroutines, Retrofit'
    },
    github: 'https://github.com/AdisAlagic'
  },
  shadows: {
    title: 'Тени Эквестрии: Последний отблеск',
    tag: 'Jetpack Compose • StateFlow • 🚧 В разработке',
    inDev: true,
    ru: {
      desc: 'Интерактивный цифровой лист персонажа и инструментарий ведущего для настольной ролевой игры (проект в разработке).',
      highlights: [
        'Статус: 🚧 В активной разработке (WIP).',
        'Мгновенный пересчет производных параметров персонажа при изменении основных характеристик.',
        'Интерактивный инвентарь с подсчётом перегруза и эффектов предметов.',
        'Встроенный генератор бросков кубиков с расчетом модификаторов сложности.',
        'Сохранение состояния сессии и поддержка тёмной атмосферной темы.'
      ],
      stack: 'Kotlin, Jetpack Compose, StateFlow, Material 3'
    },
    en: {
      desc: 'Companion application for tabletop RPG players and Game Masters providing digital character sheets and tools (in active development).',
      highlights: [
        'Status: 🚧 Actively in Development (WIP).',
        'Instant recalculation of character traits and modifiers upon state updates.',
        'Dynamic inventory manager with encumbrance tracking.',
        'Built-in polyhedral dice roller with complex rule resolution.',
        'Session persistence with atmospheric dark theme.'
      ],
      stack: 'Kotlin, Jetpack Compose, StateFlow, Material 3'
    },
    github: 'https://github.com/AdisAlagic'
  },
  minitextrpg: {
    title: 'MiniTextRPG — Text RPG & Reverse Engineering',
    tag: 'Jetpack Compose • Android NDK • C++',
    ru: {
      desc: 'Пошаговая текстовая RPG на Jetpack Compose с архитектурой MVVM, динамическим логом событий и интеграцией Android NDK (C++) для обфускации победного секрета.',
      highlights: [
        'Игровая стейт-машина на Kotlin Coroutines и StateFlow (фазы исследования замка и пошаговой битвы).',
        'Интерактивный UI на Jetpack Compose: автоскролл боевого лога, горизонтальная сетка инвентаря и модальные окна экипировки.',
        'Пошаговая боевая система с генерацией бросков урона, механикой защиты (х1.5 к броне) и поведением врага.',
        'Встроенный CTF-челлендж: победный ключ защищен на уровне нативной библиотеки на C++ с SHA-256 и XOR-обфускацией от Klaxit Hidden Secrets.'
      ],
      stack: 'Kotlin, Jetpack Compose, Material 3, Android NDK, C++, CMake, StateFlow'
    },
    en: {
      desc: 'Turn-based text RPG on Jetpack Compose featuring MVVM architecture, dynamic event logging, and Android NDK (C++) integration for secret obfuscation.',
      highlights: [
        'State machine driven by Kotlin Coroutines and StateFlow (castle exploration and turn-based battle phases).',
        'Interactive Jetpack Compose UI: automatic combat log scrolling, horizontal inventory grid, and item dialogs.',
        'Combat system with RNG damage rolls, armor mitigation, defensive stances, and enemy AI heuristics.',
        'Embedded CTF/reverse-engineering challenge: victory flag protected in native C++ library with SHA-256 and XOR obfuscation via Klaxit Hidden Secrets.'
      ],
      stack: 'Kotlin, Jetpack Compose, Material 3, Android NDK, C++, CMake, StateFlow'
    },
    github: 'https://github.com/AdisAlagic/minitextrpg'
  }
};

function initProjectsModal() {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!modal || !modalBody) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-modal');
      const data = projectDetails[projectId];
      if (!data) return;

      const langData = data[currentLang] || data.ru;
      const displayTitle = langData.title || data.title;
      const displayTag = langData.tag || data.tag;

      modalBody.innerHTML = `
        <span class="project-tag" style="margin-bottom:8px; display:inline-block;">${displayTag}</span>
        <h2 style="font-size: 1.6rem; margin-bottom: 14px; color: var(--text-primary);">${displayTitle}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${langData.desc}</p>

        <h4 style="font-size: 1rem; margin-bottom: 10px; color: var(--text-primary);">
          ${currentLang === 'ru' ? 'Ключевые инженерные решения:' : 'Engineering Highlights:'}
        </h4>
        <ul style="list-style: disc; padding-left: 20px; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.6;">
          ${langData.highlights.map(h => `<li style="margin-bottom: 6px;">${h}</li>`).join('')}
        </ul>

        <div style="margin-bottom: 24px; padding: 12px; border-radius: 8px; background: rgba(127, 82, 255, 0.1); border: 1px solid rgba(127, 82, 255, 0.25);">
          <strong style="color: #c79bff; font-family: var(--font-mono); font-size: 0.85rem;">
            ${currentLang === 'ru' ? 'Стек технологий:' : 'Tech Stack:'}
          </strong>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-primary); margin-top: 4px;">
            ${langData.stack}
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          ${data.closed ? `
            <span class="btn btn-sm btn-disabled-status" style="border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1); color: #f87171;">
              🔒 ${currentLang === 'ru' ? 'Closed Source (Коммерческий проект)' : 'Closed Source (Proprietary)'}
            </span>
          ` : `
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              ${data.inDev ? (currentLang === 'ru' ? 'Смотреть репозиторий (Dev)' : 'View Repo (Dev)') : (currentLang === 'ru' ? 'Открыть на GitHub' : 'View on GitHub')} ↗
            </a>
          `}
          <button class="btn btn-outline btn-sm" id="modalDismissBtn">
            ${currentLang === 'ru' ? 'Закрыть' : 'Close'}
          </button>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');

      const dismiss = document.getElementById('modalDismissBtn');
      if (dismiss) {
        dismiss.addEventListener('click', closeModal);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

/* ==========================================================================
   8. Live Moscow Time Clock (UTC+3)
   ========================================================================== */
function initMoscowClock() {
  const clockEl = document.getElementById('moscowClock');
  const statusEl = document.getElementById('workStatus');
  if (!clockEl) return;

  function updateClock() {
    // Current time in Moscow timezone (UTC+3)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const moscowTime = new Date(utc + (3600000 * 3));

    const hours = String(moscowTime.getHours()).padStart(2, '0');
    const minutes = String(moscowTime.getMinutes()).padStart(2, '0');
    const seconds = String(moscowTime.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${hours}:${minutes}:${seconds}`;

    // Status based on hour (10:00 - 20:00 typical availability)
    const hourNum = moscowTime.getHours();
    if (statusEl) {
      if (hourNum >= 10 && hourNum < 21) {
        statusEl.textContent = currentLang === 'ru' ? 'Рабочее время: на связи' : 'Working hours: Available';
        statusEl.style.color = 'var(--color-accent-emerald)';
      } else {
        statusEl.textContent = currentLang === 'ru' ? 'Нерабочее время: отвечу утром' : 'Off-hours: Will reply soon';
        statusEl.style.color = 'var(--color-compose-cyan)';
      }
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   9. Quick Telegram Message Form
   ========================================================================== */
function initQuickContactForm() {
  const form = document.getElementById('quickContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const message = document.getElementById('senderMsg').value.trim();

    const fullText = encodeURIComponent(`Привет, Игорь!\n\nМеня зовут ${name}.\n\n${message}`);
    const telegramUrl = `https://t.me/adisalagic?text=${fullText}`;

    showToast(currentLang === 'ru' ? 'Переход в Telegram...' : 'Opening Telegram...');
    window.open(telegramUrl, '_blank');
  });
}
