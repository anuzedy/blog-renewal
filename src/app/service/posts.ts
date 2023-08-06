import axios from "axios";
import { assetsURL, client } from "./sanity";

export type Post = {
  id: number;
  title: string;
  category: object;
  description: string;
  date: string;
  author: string;
  thumbnail: string;
}

export type PostDetail = Post & {
  content: string;
  beforePost: Post | null;
  afterPost: Post | null;
}

export type CreatePost = {
  userId: string;
  thumbnail: Blob;
  title: string;
  description: string;
  category: string;
  content: string;
}

export async function getPostsAll() {
  return client.fetch(
    `*[_type == "post"] | order(_createdAt desc){
      "id": _id,
      title,
      category,
      description,
      "date": _createdAt,
      "author": author->{nickname},
      content,
      "thumbnail": thumbnail.asset->url
    }`
  );
}

export async function getPostRecent() {
  return client.fetch(
    `*[_type == "post"] | order(_createdAt desc){
      "id": _id,
      title,
      category,
      description,
      "date": _createdAt,
      "author": author->{nickname},
      content,
      "thumbnail": thumbnail.asset->url
    }[0..0]`
  );
}

export async function getPostById(id: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${id}"]{
      "id": _id,
      title,
      category,
      description,
      "date": _createdAt,
      "author": author->{nickname},
      content,
      "thumbnail": thumbnail.asset->url
    }`
  );
}

export async function getPostByIdCategory(category: string, id: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${id}" && category._ref == "${category}"]{
      "id": _id,
      title,
      category,
      description,
      "date": _createdAt,
      "author": author->{nickname},
      content,
      "thumbnail": thumbnail.asset->url
    }`
  );
}

export async function getPostByCategory(category: string) {
  return client.fetch(
    `*[_type == "post" && category._ref == "${category}"] | order(_createdAt desc){
      "id": _id,
      title,
      category,
      description,
      "date": _createdAt,
      "author": author->{nickname},
      content,
      "thumbnail": thumbnail.asset->url
    }`
  );
}

export async function createPost(post: CreatePost) {

  return fetch(assetsURL, {
    method: 'POST',
    headers: {
      'Content-Type': post.thumbnail.type,
      Authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`
    },
    body: post.thumbnail,
  })
    .then(res => res.json())
    .then(result => {
      return client.create({
        _type: 'post',
        author: { _ref: post.userId },
        thumbnail: { asset: { _ref: result.document._id } },
        title: post.title,
        description: post.description,
        category: { _ref: post.category },
        content: post.content,
      });
    })
}