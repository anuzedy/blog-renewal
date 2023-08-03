'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Card from './Card';
import axios from 'axios';
import { Post } from '../service/posts';
import Link from 'next/link';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function RecentCarousel({ deviceType }: { deviceType: string }) {
  const [contents, setContents] = useState<Array<Post>>([]);
  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setContents(res.data.posts));
  }, []);

  return (
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      draggable={false}
      infinite={true}
      autoPlay
      autoPlaySpeed={3000}
      centerMode={false}
      containerClass="react-multi-carousel-list"
      focusOnSelect={false}
      pauseOnHover
      shouldResetAutoplay
      showDots={true}
      slidesToSlide={1}
    >
      {
        contents.map((v) =>
          <Link href={`/post/all/${v.id}`} key={v.id}><Card title={v.title} description={v.description} thumbnail={v.thumbnail} /></Link>
        )
      }
    </Carousel>
  )
}
