'use client';

import Buttons from '@/components/Buttons';
import type { KV } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

interface Props {
  courses: KV[];
  initialAudience?: string | null;
  initialCourse?: string | null;
  initialGrade?: string | null;
}

const Courses: FC<Props> = ({ courses, initialAudience = null, initialCourse = null, initialGrade = null }) => {
  const router = useRouter();

  const [audience, setAudience] = useState<string | null>(initialAudience);
  const [course, setCourse] = useState<string | null>(initialCourse);
  const [grade, setGrade] = useState<string | null>(initialGrade);

  useEffect(() => {
    const url = new URL(BASE_URL);

    if (audience) {
      url.searchParams.set('audience', audience);
    }

    if (course) {
      url.searchParams.set('course', course);
    }

    if (grade) {
      url.searchParams.set('grade', grade);
    }

    router.push(url.toString());
  }, [audience, course, grade]);

  return (
    <section className="container flex flex-col items-center gap-y-4 py-8">
      <h3 className="text-lg">Soy un</h3>
      <Buttons
        initialSelected={audience}
        labels={[
          { key: 'student', value: 'Alumno' },
          { key: 'teacher', value: 'Profesor' },
        ]}
        onSelected={setAudience}
      />
      <h3 className="text-lg">Quiero ver los contenidos de</h3>
      <Buttons initialSelected={course} labels={courses} onSelected={setCourse} />
      <h3 className="text-lg">Para el grado de</h3>
      <Buttons
        initialSelected={grade}
        labels={[
          { key: '1', value: '1ro' },
          { key: '2', value: '2do' },
          { key: '3', value: '3ro' },
          { key: '4', value: '4to' },
          { key: '5', value: '5to' },
          { key: '6', value: '6to' },
        ]}
        onSelected={setGrade}
      />
    </section>
  );
};

export default Courses;
