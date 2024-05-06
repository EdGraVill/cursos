'use server';

import Editor from '@/components/Editor';
import { createContent, getCourses } from '@/serverActions';
import { unstable_noStore } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  unstable_noStore();
  const courses = await getCourses();

  return (
    <main>
      <Image
        alt="New content cover image"
        className="h-40 w-full object-cover md:h-80 lg:h-96"
        height={1024}
        src="/images/bg.webp"
        width={1792}
      />
      <div className="container">
        <Link className="flex items-center px-4 py-1 text-base" href="/">
          <span className="text-2xl font-bold">◄</span>
          <span className="ml-2 hidden sm:inline">Atrás</span>
        </Link>
      </div>
      <form action={createContent} className="container">
        <input
          className="w-full p-4 text-center text-3xl font-bold focus:outline-none"
          name="title"
          placeholder="Título"
          required={true}
          type="text"
        />
        <p className="my-4 text-center text-xl">
          Este contenido es para{' '}
          <select className="mx-2 rounded-md border border-gray-500 px-2 py-1 text-center" name="audience">
            <option value="student">Alumnos</option>
            <option value="teacher">Profesores</option>
          </select>
          de
          <input
            className="mx-2 rounded-md border border-gray-500 p-1 text-center"
            list="courses"
            name="course"
            placeholder="Materia"
            required={true}
            type="text"
          />
          <datalist id="courses">
            {courses.map((course) => (
              <option key={course} value={course} />
            ))}
          </datalist>{' '}
          para
          <select className="mx-2 rounded-md border border-gray-500 p-1 text-center" name="grade">
            <option value="1">1er</option>
            <option value="2">2do</option>
            <option value="3">3er</option>
            <option value="4">4to</option>
            <option value="5">5to</option>
            <option value="6">6to</option>
          </select>{' '}
          grado.
        </p>
        <Editor name="content" />
        <input
          className="mx-auto my-6 flex cursor-pointer items-center rounded-lg border-2 border-black px-4 py-1 text-xl"
          type="submit"
          value="Publicar"
        />
      </form>
    </main>
  );
}
