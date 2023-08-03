import { client } from "./sanity";
import { Post } from "./posts";

export type Category = {
  id: string;
  title: string;
  name: string;
  group: string;
  relatedPosts: Array<Post>;
}

export type Group = {
  title: string;
  name: string;
  relatedCategories: Array<Category>;
}

export async function getGroups2() {
  return client.fetch(
    `*[_type == "group"]{
      "id": _id,
      title,
      name,
      "relatedCategories": *[_type=='category' && references(^._id)]{ 
        "id": _id,
        title,
        name,
        "relatedPosts": *[_type == 'post' && references(^._id)][0..0]{ 
          "id": _id
        }
      }
    }`
  );
}

export async function getCategories2() {
  return client.fetch(
    `*[_type == "category"]{
      "id": _id,
      title,
      name,
      "group": group->name,
      "relatedPosts": *[_type == 'post' && references(^._id)]{ 
        "id": _id
      }
    }`
  );
}