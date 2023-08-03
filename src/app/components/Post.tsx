'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PostDetail } from '../service/posts';
import Image from 'next/image';
import PostContent from './PostContent';
import AdjacentPostCard from './AdjacentPostCard';

type Props = {
  category: string;
  id: string;
};

export default function Post({ category, id }: Props) {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [noPost, setNoPost] = useState<string>('');

  useEffect(() => {
    const apiUrl = id === '' ? '/api/postRecent' : category === 'all' ? '/api/post' : '/api/postByIdCategory';
    const params = id === '' ? {} : category === 'all' ? { id } : { category, id };
    console.log('id : ', id);
    axios.get(apiUrl, {
      params
    })
      .then(res => {
        console.log(res.data.post);
        res.data.post[0] ? setNoPost('') : setNoPost('포스트가 존재하지 않습니다.');
        setPost(res.data.post[0]);
      })
      .catch(() => {
        setNoPost('포스트가 존재하지 않습니다.');
      });
  }, [category, id]);

  return post ? (
    <article className='rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4'>
      <Image
        className='w-full h-1/5 max-h-[500px]'
        src={`${post.thumbnail}`}
        alt={post.title}
        width={760}
        height={420}
      />
      <PostContent post={post} />
      <section className='flex shadow-md'>
        {post.beforePost && <AdjacentPostCard post={post.beforePost} type='before' />}
        {post.afterPost && <AdjacentPostCard post={post.afterPost} type='after' />}
      </section>
    </article>
  ) : (
    <div>
      {noPost}
    </div>
  );
}
