'use client';
import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { PostDetail } from '../service/posts';
import { sanityTimeFormat } from '../lib/time';

export default function PostContent({ post }: { post: PostDetail }) {
  const { date, title, description, content } = post;
  const formatDate = sanityTimeFormat(date);

  return (
    <section className='flex flex-col p-4'>
      <div className='flex items-center self-end text-sky-600'>
        <AiTwotoneCalendar />
        <p className='font-semibold ml-2'>{formatDate}</p>
      </div>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <div className='w-44 border-2 border-sky-600 mt-4 mb-8' />
      <MarkdownViewer content={content}></MarkdownViewer>
    </section>
  )
}
