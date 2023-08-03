import { hashPassword } from "../lib/auth";
import { client } from "./sanity";

type User = {
  id: string;
  nickname: string;
  password: string;
}

export async function addUser({ id, nickname, password }: User) {
  const hashedPassword = await hashPassword(password);
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    id,
    nickname,
    password: hashedPassword,
    auth: process.env.SANITY_USER_DEFAULT_AUTH,
  });
}

export async function getUserById(id: string | undefined) {
  return client.fetch(
    `*[_type == "user" && id == "${id}"]{
      "id":_id,
      password,
      nickname,
      email,
      auth
    }`
  );
}