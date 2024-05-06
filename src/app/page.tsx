'use server';

import Filters from '@/sections/Filters';
import { getContentsPreview, getCourses } from '@/serverActions';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';

interface Props {
  params: Record<string, string>;
  searchParams: Partial<Record<'audience' | 'course' | 'grade', string>>;
}

export default async function Home({ searchParams: { audience, course, grade } }: Props) {
  unstable_noStore();
  const courses = await getCourses();

  const contentPreview = await getContentsPreview(audience, course, grade);

  return (
    <>
      <div className="container absolute flex justify-end p-4">
        <Link className="flex items-center rounded-lg border-2 border-black px-4 py-1 text-base" href="/new">
          <span className="text-2xl font-bold">+</span>
          <span className="ml-2 hidden sm:inline">Nuevo</span>
          <span className="ml-1 hidden md:inline">Artículo</span>
        </Link>
      </div>
      <h1 className="pt-8 text-center text-4xl font-bold">Cursos</h1>
      <Filters
        courses={courses.map((course) => ({ key: course, value: course }))}
        initialAudience={audience}
        initialCourse={course}
        initialGrade={grade}
      />
      <section className="container my-6">
        {contentPreview.length ? (
          contentPreview.map(({ id, title }) => (
            <Link className="group block w-full text-center text-lg" href={`/content/${id}`} key={id}>
              <span className="hidden group-hover:inline">{'> '}</span>
              {title}
              <span className="hidden group-hover:inline">{' <'}</span>
            </Link>
          ))
        ) : (
          <p className="text-center italic text-slate-500">
            <span className="text-lg not-italic">Aún no hay contenidos que mostrar.</span>
            <br /> Prueba seleccionando diferentes opciones arriba, o escribiendo algo{' '}
            <Link className="underline" href="/new">
              aqui
            </Link>{' '}
          </p>
        )}
      </section>
    </>
  );
}
