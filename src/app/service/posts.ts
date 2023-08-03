import { client } from "./sanity";

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

export async function getPostsAll() {
  return client.fetch(
    `*[_type == "post"]{
      "id": _id,
      category,
      title,
      description,
      "date": _createdAt,
      "author": author->{nickname},
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