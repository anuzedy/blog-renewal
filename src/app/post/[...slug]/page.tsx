import React from 'react'
import Post from '../../components/Post';
import Category from '@/app/components/Category';

type Props = {
  params: {
    slug: Array<string>;
  };
};

export default function PostPage({ params: { slug } }: Props) {
  const [category, no] = slug;
  const num = Number(no);

  return (
    <>
      <div>
        <Category cateName={category} />
      </div>
      <div className='col-span-7'>
        <Post category={category || ''} num={num || 0} />
      </div>
    </>
  )
}
