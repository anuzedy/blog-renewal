import React from 'react'
import Post from '../../components/Post';
import Category from '@/app/components/Category';
import { getGroups } from '@/app/service/categories';

type Props = {
  params: {
    slug: Array<string>;
  };
};

export default function PostPage({ params: { slug } }: Props) {
  const [category, no] = slug;
  const num = Number(no);
  const groups = getGroups();


  return (
    <>
      <div>
        {/* @ts-expect-error Server Component */}
        <Category cateName={category} groupPromise={groups} />
      </div>
      <div className='col-span-7'>
        <Post category={category || ''} num={num || 0} />
      </div>
    </>
  )
}
