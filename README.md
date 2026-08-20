# Voxa

AI-инструмент, который генерирует игровые ассеты — текстуры, спрайты, элементы окружения — по текстовому описанию, в едином художественном стиле. Для инди-разработчиков без бюджета на художника.

**Живой MVP:** https://sanctuaryheavenly88-byte.github.io/Voxa/

## Проблема

Маленькие команды тратят недели на визуальные ассеты вместо того, чтобы делать игру. Художник-фрилансер стоит от $3–8K за полноценный стиль.

## Как это работает

1. Разработчик вводит описание объекта — например, «средневековый меч, пиксель-арт»
2. Выбирает стиль проекта
3. Получает готовый ассет через несколько секунд — сразу в форматах Unity/Unreal

Протестировано на собственном Unity 3D платформере (grappling hook, coyote time, double jump).

## Запуск скрипта генерации

```bash
npm install node-fetch dotenv
cp .env.example .env   # впиши свой STABILITY_API_KEY
node voxa-generate.js "medieval sword, pixel art"
```

Ключ для Stability AI — на [platform.stability.ai](https://platform.stability.ai).

## Стек

- Frontend: HTML/CSS/JS
- Генерация: Stability AI API (text-to-image)
- Демо-игра: Unity 3D

## Команда

Draken — Unity, C#, интеграция AI-пайплайна.

---

Подготовлено для **President AI Award 2026**, School 21 Ташкент.
