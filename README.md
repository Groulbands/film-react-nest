# Film! — онлайн-кинотеатр

**Опубликованное приложение:** http://212.193.48.48

React + TypeScript + Vite (frontend), Nest.js + TypeORM + PostgreSQL (backend),
Nginx (публичный reverse proxy), Docker Compose и GitHub Actions/GHCR.

## Запуск через Docker Compose

Необходимы Docker Engine и Docker Compose. В корне проекта:

```bash
cp .env.example .env
```

В `.env` укажите `GHCR_OWNER` (ваш GitHub namespace) и надёжные значения
`DATABASE_PASSWORD` и `PGADMIN_DEFAULT_PASSWORD`.
Не отправляйте `.env` в Git. Пример включает все переменные, передаваемые
контейнерам через `env_file`. Пароль `POSTGRES_PASSWORD` задаётся как ссылка
на `DATABASE_PASSWORD`; логин и имя базы аналогично получаются из
`DATABASE_USERNAME` и `DATABASE_NAME`.

Сборка и запуск **локально**:

```bash
docker compose up -d --build
```

Доступны интерфейс `http://localhost` и API `http://localhost/api/afisha/films`.
Прямой доступ к API `127.0.0.1:3000` открыт только на локальном компьютере.
Опционально запустить pgAdmin локально: `docker compose --profile tools up -d pgadmin`
(адрес `http://127.0.0.1:8080`, хост БД в pgAdmin: `database`, порт `5432`).

### Начальные данные PostgreSQL

Однократно после запуска БД выполните из корня проекта:

```bash
docker compose exec -T database sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=1' < backend/test/prac.init.sql
docker compose exec -T database sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=1' < backend/test/prac.films.sql
docker compose exec -T database sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=1' < backend/test/prac.shedules.sql
```

Имена файлов соответствуют содержимому `backend/test` (включая `prac.shedules.sql`).
Данные сохраняются в Docker volume `film_postgres_data`. **Не используйте
`docker compose down -v`**, если хотите сохранить бронирования.

## Тестирование и линтинг

```bash
cd backend
npm ci
npm run lint
npm test -- --runInBand
npm run build

cd ../frontend
npm ci
npm run lint
npm run build
```

Логгер Nest.js выбирается через `LOGGER_FORMAT=dev|json|tskv` в `.env`.

## Публикация образов в GHCR

Workflow `.github/workflows/publish-images.yml` при push в `review-3` и `main`
проверяет тесты, линтинг, собирает приложение и публикует три образа:

- `ghcr.io/<owner>/film-frontend:latest` и `:sha-<full_commit_sha>`;
- `ghcr.io/<owner>/film-backend:latest` и `:sha-<full_commit_sha>`;
- `ghcr.io/<owner>/film-nginx:latest` и `:sha-<full_commit_sha>`.

Ветка `review-3` не требует слияния с `main` для выполнения workflow.
Доступ к приватным образам требует входа в GHCR; публичные образы доступны
через `docker pull` без логина.

## Деплой на VPS (Ubuntu + Docker Compose)

1. Установить Docker Engine и Compose, создать `/opt/film`.
2. Скопировать на сервер `docker-compose.prod.yml` и `.env.example`
   (последний переименовать в `.env` и заполнить **своими** секретами).
   Для обновления уже работающего сервера **не заменять действующий `.env`**:
   сохранить прежние `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
   и добавить новые ключи по образцу `.env.example`.
3. Загрузить образы, запустить контейнеры и проверить статус:

```bash
cd /opt/film
docker compose -f docker-compose.prod.yml config --quiet
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps
```

**Обновление с прежней версии проекта (`postgres` / `frontend-build`):**
сначала, пока работает *старый* Compose-файл, сохраните дамп данных:

```bash
cd /opt/film
docker compose -f docker-compose.prod.yml exec -T postgres \
  sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' \
  > /root/film-backup.sql
chmod 600 /root/film-backup.sql
```

Затем перенесите новый `docker-compose.prod.yml`, обновите существующий `.env`
**не меняя старые пароли**, проверьте конфигурацию и загрузите новые образы.
Перед первым запуском новой версии **обязательно остановите старую БД**:

```bash
docker compose -f docker-compose.prod.yml config --quiet
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml down --remove-orphans
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps
```

Этот короткий простой необходим: одновременно использовать один PostgreSQL volume
двумя контейнерами небезопасно. `down --remove-orphans` **не удаляет**
именованный том `film_postgres_data`; никогда не добавляйте `-v`.

4. На новой базе импортировать SQL-файлы из `backend/test` командами из раздела выше,
   заменив `docker compose exec` на `docker compose -f docker-compose.prod.yml exec`.
   На существующем сервере с заполненной базой **не выполнять импорт повторно**.
5. Проверить `curl -I http://127.0.0.1/` и
   `curl http://127.0.0.1/api/afisha/films` на VPS; открыть IP сервера в браузере.

В production доступны только HTTP-порт `80` на Nginx; PostgreSQL и Nest.js
не публикуют порты наружу, pgAdmin отсутствует. React раздаётся собственным
frontend-контейнером с Nginx, а внешний Nginx маршрутизирует запросы
`/api/` и `/content/` в backend. Для SPA-роутов настроен fallback на `index.html`.
HTTPS и домен необязательны для текущего деплоя.
