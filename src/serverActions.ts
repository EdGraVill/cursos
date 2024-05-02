import { sql } from '@vercel/postgres';
import type { Content } from './types';

export async function getCourses(): Promise<string[]> {
  const { rows: courses } = await sql<Pick<Content, 'course'>>`select distinct course from contents`;

  return courses.map(({ course }) => course);
}

export async function getContentsPreview(
  audience?: string,
  course?: string,
  grade?: string,
): Promise<Array<Pick<Content, 'id' | 'title' | 'summary'>>> {
  if (!audience || !course || !grade) {
    return [];
  }

  const { rows: contents } = await sql<Pick<Content, 'id' | 'title' | 'summary'>>`
    select
      id, title, summary
    from contents c
    where
      c.audience = ${audience}
      and c.course = ${course}
      and c.grade = ${grade};
  `;

  return contents;
}

export async function getContent(id: number): Promise<Content> {
  const {
    rows: [content],
  } = await sql<Content>`
    select
      *
    from contents c
    where
      c.id = ${id};
  `;

  return content;
}

export async function createContent(newContent: Omit<Content, 'id'>): Promise<Content> {
  const {
    rows: [content],
  } = await sql<Content>`
    insert into contents
    (audience, aurthor, content, course, grade, summary, title)
    values
    (
      ${newContent.audience},
      ${newContent.aurthor},
      ${newContent.content},
      ${newContent.course},
      ${newContent.grade},
      ${newContent.summary},
      ${newContent.title}
    )
    returning *;
  `;

  return content;
}
