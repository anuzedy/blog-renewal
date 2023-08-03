import React from 'react'
import Post from '../../components/Post';
import Category from '@/app/components/Category';

type Props = {
  params: {
    slug: Array<string>;
  };
};

export default function PostPage({ params: { slug } }: Props) {
  const [category, id] = slug;

  return (
    <>
      <div>
        <Category cateName={category} />
      </div>
      <div className='col-span-7'>
        <Post category={category || ''} id={id || ''} />
      </div>
    </>
  )
}
