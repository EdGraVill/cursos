'use server';

import Editor from '@/components/Editor';
import { getContent } from '@/serverActions';
import { unstable_noStore } from 'next/cache';

export default async function ContentLayout({ params: { id } }: { params: { id: string } }) {
  unstable_noStore();
  const content = await getContent(parseInt(id, 10));

  return (
    <>
      <h1 className="w-full p-4 text-center text-3xl font-bold focus:outline-none">{content.title}</h1>
      <Editor defaultValue={content.content} disabled={true} name="content" />
    </>
  );
}
