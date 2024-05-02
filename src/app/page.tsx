'use server';

import Filters from '@/sections/Filters';
import { getContentsPreview, getCourses } from '@/serverActions';

interface Props {
  params: Record<string, string>;
  searchParams: Partial<Record<'audience' | 'course' | 'grade', string>>;
}

export default async function Home({ searchParams: { audience, course, grade } }: Props) {
  const courses = await getCourses();

  const contentPreview = await getContentsPreview(audience, course, grade);

  return (
    <>
      <h1 className="pt-8 text-center text-4xl font-bold">Cursos</h1>
      <Filters
        courses={[
          { key: 'math', value: 'Matemáticas' },
          { key: 'cience', value: 'Ciencias' },
          ...courses.map((course) => ({ key: course, value: course })),
        ]}
        initialAudience={audience}
        initialCourse={course}
        initialGrade={grade}
      />
      {JSON.stringify(contentPreview)}
    </>
  );
}
