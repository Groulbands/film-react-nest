-- Run against an existing PostgreSQL database named films.
-- Schema matches the TypeORM Film and Schedule entities.
BEGIN;
CREATE TABLE IF NOT EXISTS films (
    id uuid PRIMARY KEY,
    rating double precision NOT NULL,
    director text NOT NULL,
    tags text[] NOT NULL DEFAULT '{}'::text[],
    title text NOT NULL,
    about text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    cover text NOT NULL
);
CREATE TABLE IF NOT EXISTS schedules (
    id uuid PRIMARY KEY,
    film_id uuid NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    daytime text NOT NULL,
    hall integer NOT NULL,
    rows integer NOT NULL CHECK (rows > 0),
    seats integer NOT NULL CHECK (seats > 0),
    price integer NOT NULL CHECK (price >= 0),
    taken text[] NOT NULL DEFAULT '{}'::text[]
);
CREATE INDEX IF NOT EXISTS idx_schedules_film_id ON schedules(film_id);
COMMIT;
