'use client';
import React, { useEffect, useState } from 'react';
import { Category as Cate, Group } from '../service/categories';
import axios from 'axios';
import Link from 'next/link';
import { Post } from '../service/posts';

type Props = {
  cateName: string
}

const underlineStyle = {
  textDecorationLine: 'underline',
}

export default function Category({ cateName }: Props) {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [allPosts, setAllPosts] = useState<Array<Post>>([]);
  useEffect(() => {
    axios.get('/api/groups')
      .then(res => {
        setGroups(res.data.groups);
      });
    axios.get('/api/posts')
      .then(res => {
        setAllPosts(res.data.posts);
      });
  }, [cateName]);

  return (
    <>
      <ul className='pl-5'>
        <li className='pt-5' style={cateName === 'all' ? underlineStyle : {}}>
          <Link href={allPosts[0] ? `/post/all/${allPosts[0].id}` : `/post/all/nopost`}>전체글</Link>
        </li>
        {groups.map((group) =>
          <li key={group.name} className='pt-5'>
            <p className='font-semibold'>{group.title}</p>
            <ul>
              {group.relatedCategories.map((category) =>
                <li key={category.name} className='pl-5' style={cateName === category.name ? underlineStyle : {}}>
                  <Link href={category.relatedPosts[0] ? `/post/${category.id}/${category.relatedPosts[0].id}` : `/post/${category.id}/nopost`}>{category.title}</Link>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </>
  )
}
