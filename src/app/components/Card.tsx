'use client';

import Image from 'next/image';
import React from 'react'

export default function Card({ title, description, thumbnail }: { title: string, description: string, thumbnail: string }) {
  return (
    <div className="flex justify-center pb-10">
      <div
        className="block max-w-xs rounded-lg bg-white shadow-lg dark:bg-neutral-700">
        <Image
          className="rounded-t-lg w-screen"
          src={`${thumbnail}`}
          alt=""
          width={300}
          height={300}
          priority />
        <div className="p-6">
          <h5
            className="text-center mb-2 text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <p className="mb-4 text-sm truncate text-neutral-600 dark:text-neutral-200">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
