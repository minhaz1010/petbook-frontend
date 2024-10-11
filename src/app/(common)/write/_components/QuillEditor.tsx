import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Loading from '@/components/Shared/Loading';
import { formats, modules } from '@/utils/modules';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface QuillEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function QuillEditor({ content, onChange }: QuillEditorProps) {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="mb-4">
      {editorLoaded ? (
        <ReactQuill
          theme="snow"
          value={content}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="text-white text-xl h-80"
        />
      ) : (
        <div className=" flex items-center h-80 justify-center bg-gray-700">
          <Loading />
        </div>
      )}
    </div>
  );
}