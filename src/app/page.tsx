'use server';

import Filters from '@/sections/Filters';

interface Props {
  params: Record<string, string>;
  searchParams: Partial<Record<'audience' | 'course' | 'grade', string>>;
}

export default async function Home({ searchParams: { audience, course, grade } }: Props) {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Cursos</h1>
      <Filters
        courses={[
          { key: 'math', value: 'Matemáticas' },
          { key: 'cience', value: 'Ciencias' },
        ]}
        initialAudience={audience}
        initialCourse={course}
        initialGrade={grade}
      />
    </>
  );
}
