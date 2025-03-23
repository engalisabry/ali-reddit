"use client";

import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface EditorOutputProps {
  content: any;
}

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false },
);

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      data={content}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  );
};

function CustomImageRenderer({ data }: any) {
  const url = data.file.url;

  return (
    <div className="w-full min-h-[15rem] relative">
      <Image
        src={url}
        fill
        className="object-contain"
        alt="Post_Image"
      />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-sm text-gray-100">{data.code}</code>
    </pre>
  );
}

export default EditorOutput;
