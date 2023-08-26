import React from 'react';
import { Category as Cate, Group } from '../service/categories';
import Link from 'next/link';

type Props = {
  cateName: string;
  groupPromise: Promise<Array<Group>>;
}

const underlineStyle = {
  textDecorationLine: 'underline',
}

export default async function Category({ cateName, groupPromise }: Props) {
  const groups = await groupPromise;

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
