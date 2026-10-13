# 🚀 Персональный сайт-резюме | Плахов Игорь (Kotlin Developer)

Современный, быстрый и отзывчивый сайт-резюме для Kotlin Android & Desktop разработчика.
Полностью готов к публикации на собственном домене, хостинге или платформах статических сайтов (GitHub Pages, Cloudflare Pages, Vercel, Netlify, VPS).

---

## 🌟 Ключевые особенности и функционал

1. **Дизайн & UI:**
   - Премиальный тёмный дизайн в стиле Kotlin/Jetpack Compose (`#7F52FF`, `#00D2FF`, `#E4485D`) + режим светлой темы.
   - Эффекты стеклянного морфизма (Glassmorphism), мягкое фоновое неоновое свечение (Ambient mesh glow).
   - Полная адаптивность: идеально отображается на смартфонах, планшетах, ноутбуках и 4K-мониторах.

2. **Интерактивные возможности:**
   - **Двуязычность (RU / EN):** мгновенное переключение языка без перезагрузки страницы (сохраняется в `localStorage`).
   - **Переключатель тем (Dark / Light):** запоминает выбор пользователя и подстраивается под системную тему.
   - **Копирование в 1 клик:** быстрый клик по Email, Telegram или телефону с анимированным уведомлением («Скопировано!»).
   - **Интерактивный просмотр кода:** переключение между примерами чистого Compose UI, MVI ViewModel и репозиторием на Coroutines Flow с кнопкой копирования.
   - **Фильтр технологий:** категории стека (Kotlin & UI, Архитектура, Базы данных & Сеть, Инструменты).
   - **Интеграция профилей:** прямые ссылки на Telegram, GitHub и официальное резюме на **HeadHunter (hh.ru)**.
   - **Генератор сообщений в Telegram:** форма быстрого старта диалога с готовым текстом.
   - **Живые часы (Moscow Time UTC+3):** отображение рабочего времени и статуса доступности.

---

## 📂 Структура проекта

```text
Resume/
├── index.html        # Главная семантическая HTML5-страница с мета-тегами SEO & OpenGraph
├── css/
│   ├── style.css     # Основные стили, CSS-переменные, темная/светлая темы, адаптивная сетка
│   └── print.css     # Стили для печати резюме в PDF (A4)
├── js/
│   └── main.js       # Логика: переключение языка, темы, фильтры, модалки, часы, копирование
├── CNAME             # Файл для привязки собственного домена в GitHub Pages
└── README.md         # Руководство по настройке и размещению на домене
```

---

## 🌐 Как разместить сайт на своем домене

Вы можете разместить этот сайт абсолютно бесплатно на любой из популярных платформ:

### Способ 1. GitHub Pages (Рекомендуемый и бесплатный)

1. Создайте новый публичный или приватный репозиторий на [GitHub](https://github.com/), например `resume` или `adisalagic.github.io`.
2. Загрузите файлы этого проекта в репозиторий:
   ```bash
   git init
   git add .
   git commit -m "Initial resume release"
   git branch -M main
   git remote add origin https://github.com/AdisAlagic/resume.git
   git push -u origin main
   ```
3. Откройте в репозитории: **Settings** → **Pages**:
   - В поле **Source** выберите ветку `main` и папку `/(root)`.
   - Нажмите **Save**. Через 1–2 минуты сайт станет доступен по адресу `https://AdisAlagic.github.io/resume/`.
4. **Привязка собственного домена (например, `plakhov.dev` или `igorplakhov.ru`):**
   - В разделе **Custom domain** введите имя вашего домена и сохраните.
   - В панели регистратора вашего домена (Reg.ru, Beget, Namecheap, Cloudflare) настройте DNS-записи:
     - Для субдомена (например, `cv.plakhov.dev`):
       - Тип: `CNAME`
       - Имя/Хост: `cv`
       - Значение: `AdisAlagic.github.io`
     - Для основного домена (`plakhov.dev`):
       - Тип: `A`
       - Значения (IP-адреса GitHub):
         - `185.199.108.153`
         - `185.199.109.153`
         - `185.199.110.153`
         - `185.199.111.153`
   - Включите галочку **Enforce HTTPS** в настройках GitHub Pages (бесплатный SSL-сертификат выдается автоматически).

---

### Способ 2. Cloudflare Pages (Мгновенно, быстро, бесплатный SSL)

1. Зарегистрируйтесь на [Cloudflare Pages](https://pages.cloudflare.com/).
2. Выберите **Direct Upload** (перетащите всю папку `Resume` мышкой в браузер) либо подключите GitHub-репозиторий.
3. В настройках проекта нажмите **Custom Domains** → укажите ваш домен.
4. Cloudflare автоматически настроит DNS и мгновенно активирует SSL.

---

### Способ 3. Vercel или Netlify

1. Перетащите папку проекта на [Netlify Drop](https://app.netlify.com/drop) или импортируйте через Vercel CLI / GitHub.
2. Добавьте свой домен в разделе **Domain Management**.

---

### Способ 4. Собственный VPS / VDS сервер (Nginx)

Если у вас есть собственный сервер с Linux и Nginx:
1. Скопируйте файлы в папку `/var/www/resume`:
   ```bash
   scp -r Resume/* user@your-server-ip:/var/www/resume/
   ```
2. Создайте конфигурацию Nginx (`/etc/nginx/sites-available/resume`):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       root /var/www/resume;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
3. Выпустите бесплатный сертификат Let's Encrypt:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 🖼️ Как установить свою реальную фотографию

В `index.html` в блоке `<div class="avatar-placeholder" id="avatarBox">` сейчас установлен стилизованный векторный аватар разработчика.
Чтобы использовать реальную фотографию:
1. Положите ваше фото в папку проекта под именем, например, `photo.jpg`.
2. В файле `index.html` найдите блок `<div class="avatar-placeholder" id="avatarBox">` и замените SVG на:
   ```html
   <img src="photo.jpg" alt="Плахов Игорь" style="width: 100%; height: 100%; object-fit: cover;">
   ```

---

## 💻 Локальный просмотр

Вы можете открыть сайт прямо на компьютере:
- Дважды кликните по файлу `index.html` — он откроется в любом браузере (Chrome, Edge, Firefox, Safari).
- Либо запустите локальный сервер, если установлен Python:
  ```bash
  python -m http.server 8000
  ```
  и перейдите в браузере по адресу `http://localhost:8000`.
