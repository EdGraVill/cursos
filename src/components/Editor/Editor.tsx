'use client';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, type FC } from 'react';

interface Props {
  defaultValue?: string;
  disabled?: boolean;
  name: string;
}

const Editor: FC<Props> = ({ defaultValue, disabled, name }) => {
  const [content, setContent] = useState(defaultValue ?? '');

  const editor = useEditor({
    content: defaultValue ?? '',
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'prose-stone prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 min-h-96 w-full focus:outline-none',
      },
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        considerAnyAsEmpty: true,
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'Escribe aquí...',
      }),
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      <input name={name} required={true} type="hidden" value={content} />
    </>
  );
};

export default Editor;
