import { sql } from '@vercel/postgres';

export default function dbMigrations() {
  sql`create table if not exists contents (
    audience text not null,
    aurthor text not null,
    content text not null,
    course text not null,
    grade text not null,
    id serial primary key,
    summary text not null,
    title text not null
  )`;
}
