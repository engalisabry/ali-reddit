'use client';

import type EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextareaAutoSize from 'react-textarea-autosize';
import { toast } from 'sonner';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/lib/uploadthing';
import { postCreationRequest, postValidator } from '@/lib/validator/post';

interface EditorProps {
  subredditId: string;
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postCreationRequest>({
    resolver: zodResolver(postValidator),
    defaultValues: {
      subredditId,
      title: '',
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>();
  const pathname = usePathname();
  const router = useRouter();

  const initEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Type here to write your post....',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: uploadImage,
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      // eslint-disable-next-line no-unused-vars
      for (const [_key, value] of Object.entries(errors)) {
        toast.error(
          `Something went wrong ${(value as { message: string }).message}`,
        );
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initEditor]);

  const { ref: titleRef, ...rest } = register('title');

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subredditId,
    }: postCreationRequest) => {
      const payload: postCreationRequest = {
        title,
        content,
        subredditId,
      };
      const { data } = await axios.post('/api/subreddit/post/create', payload);
      return data;
    },
    onError: () => {
      return toast.error(
        'Something went wrong, Your post was not published try again later.',
      );
    },
    onSuccess: () => {
      const newPathname = pathname.split('/').slice(0, -1).join('/');

      router.push(newPathname);

      router.refresh();

      return toast('Your post has been published!');
    },
  });

  async function onSumbit(data: postCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: postCreationRequest = {
      title: data.title,
      content: blocks,
      subredditId,
    };

    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="subreddit-post-form"
        className="w-full"
        onSubmit={handleSubmit(onSumbit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutoSize
            ref={(e) => {
              titleRef(e);
              //@ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />

          <div
            id="editor"
            className="min-h-[500px]"
          />
        </div>
      </form>
    </div>
  );
};

export default Editor;
