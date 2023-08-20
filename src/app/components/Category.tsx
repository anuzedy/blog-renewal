'use client';
import React, { useEffect, useState } from 'react';
import { Category as Cate, Group } from '../service/categories';
import axios from 'axios';
import Link from 'next/link';

type Props = {
  cateName: string
}

const underlineStyle = {
  textDecorationLine: 'underline',
}

export default function Category({ cateName }: Props) {
  const [groups, setGroups] = useState<Array<Group>>([]);
  useEffect(() => {
    axios.get('/api/groups')
      .then(res => {
        console.log(res.data.groups);
        setGroups(res.data.groups);
      });
  }, [cateName]);

  return (
    <>
      <ul className='pl-5'>
        <li className='pt-5' style={cateName === 'all' ? underlineStyle : {}}>
          <Link href={`/post/all/0`}>전체글</Link>
        </li>
        {groups.map((group) =>
          <li key={group.name} className='pt-5'>
            <p className='font-semibold'>{group.title}</p>
            <ul>
              {group.relatedCategories.map((category) =>
                <li key={category.name} className='pl-5' style={cateName === category.id ? underlineStyle : {}}>
                  <Link href={`/post/${category.id}/0`}>{category.title}</Link>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </>
  )
}
