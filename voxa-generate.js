/**
 * Voxa — генератор игровых ассетов по текстовому описанию.
 *
 * ЭТО ЧЕРНОВИК-СКЕЛЕТ, НЕ ФИНАЛЬНЫЙ КОД ДЛЯ СДАЧИ.
 * Перед коммитом в репозиторий перепиши логику своими словами:
 * другие имена переменных, свой стиль комментариев, свой порядок
 * шагов. Важно, чтобы ты мог объяснить каждую строку на защите.
 *
 * Что делает:
 *  1. Принимает текстовое описание ассета + выбранный стиль проекта
 *  2. Отправляет запрос в Stability AI (text-to-image)
 *  3. Сохраняет результат в /assets с именем по слагу запроса
 *
 * Установка:
 *   npm install node-fetch dotenv
 *   echo "STABILITY_API_KEY=твой_ключ" > .env
 *
 * Запуск:
 *   node voxa-generate.js "medieval sword, pixel art"
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const API_KEY = process.env.STABILITY_API_KEY;
const API_URL = 'https://api.stability.ai/v2beta/stable-image/generate/core';
const OUTPUT_DIR = path.join(__dirname, 'assets');

if (!API_KEY) {
  console.error('Нет STABILITY_API_KEY в .env — получи ключ на platform.stability.ai');
  process.exit(1);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
}

async function generateAsset(prompt, stylePreset = 'pixel-art') {
  const form = new FormData();
  form.append('prompt', prompt);
  form.append('output_format', 'png');
  form.append('style_preset', stylePreset); // напр. pixel-art, low-poly, fantasy-art

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: 'image/*',
    },
    body: form,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Stability API error ${res.status}: ${errText}`);
  }

  const buffer = await res.buffer();
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  const filename = `${slugify(prompt)}-${Date.now()}.png`;
  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, buffer);

  console.log(`Готово: ${filePath}`);
  return filePath;
}

// CLI entry point
const promptArg = process.argv.slice(2).join(' ');
if (!promptArg) {
  console.error('Использование: node voxa-generate.js "описание ассета"');
  process.exit(1);
}

generateAsset(promptArg).catch((err) => {
  console.error('Ошибка генерации:', err.message);
  process.exit(1);
});
