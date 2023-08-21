'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PostDetail } from '../service/posts';
import Image from 'next/image';
import PostContent from './PostContent';
import AdjacentPostCard from './AdjacentPostCard';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  category: string;
  num: number;
};

export default function Post({ category, num }: Props) {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [noPost, setNoPost] = useState<string>('');
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const apiUrl = category === 'all' ? '/api/posts' : '/api/postByCategory';
    const params = category === 'all' ? {} : { category };
    axios.get(apiUrl, {
      params
    })
      .then(res => {
        const posts = res.data.posts;
        console.log(res);
        console.log(posts);

        if (posts[num]) {
          setNoPost('');
          const post: PostDetail = posts[num];
          post.beforePost = num === 0 ? null : posts[num - 1];
          post.afterPost = num > posts.length - 1 ? null : posts[num + 1];
        }
        posts[num] ? setNoPost('') : setNoPost('포스트가 존재하지 않습니다.');

        setPost(posts[num]);
      })
      .catch(() => {
        setNoPost('포스트가 존재하지 않습니다.');
      });
  }, [category, num]);

  return (
    <>
      {
        user?.auth === 'admin' ?
          <div className='text-right'>
            <Link href={'/write'}><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">포스팅</button></Link>
          </div>
          : null
      }
      {post ? (
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
            {post.beforePost && <AdjacentPostCard post={post.beforePost} category={category} num={num - 1} type='before' />}
            {post.afterPost && <AdjacentPostCard post={post.afterPost} category={category} num={num + 1} type='after' />}
          </section>
        </article>
      ) : (
        <div>
          {noPost}
        </div>
      )
      }
    </>
  );
}
