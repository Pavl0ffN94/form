# Temlate React Form

это проект шаблона формы в нем 4 шага
на каждом из них пользователь выбирает несколько полей
есть простые текстовые и числовые поля,
селекты с выбором из списка,
компонент Dropzone,
в конце отправка происходит на тестовый сервер расположеный
на локальном порту 4000(можно поменять в файле server.js)

## Инструкции по установке

1. Клонировать репозиторий: `git clone https://github.com/Pavl0ffN94/form.git`
2. Перейти в директорию проекта: `cd form`
3. Установить зависимости: `yarn install`

## Запуск проекта

1. Запустить клиентскую часть: `yarn dev`
2. Запустить серверную часть: `yarn start:server`

## Технологии

для обработки форм я использовал `react-hooks-form`
для роутинга `react-router`
для хранения формы между переходами `Redux Toolkit`
для сборки `Vite`
также `TypeScript` для типизации данных

## Структура проекта

В поекте есть папка pages там хранятся компоненты каждой страници представленной в форме
в папке stor хранится все что связано со стором(слайсы, селекторы)
в папке types хранятся типы
в папке components хранится компонент dropzone
(изначально думал что компонентов будет больше)
