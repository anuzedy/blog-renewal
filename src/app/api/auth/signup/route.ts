import { addUser, getUserById } from "@/app/service/user";
import { NextResponse } from "next/server";

type UserRequest = {
  id: string;
  password: string;
  nickname: string;
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return;
  }

  const { id, password, nickname }: UserRequest = await request.json();
  const user = await getUserById(id);

  try {
    if (user.length > 0) {
      return NextResponse.json({ message: '이미 존재하는 아이디입니다.', error: true }, { status: 409 });
    }

    const result = await addUser({ id, password, nickname });
    return NextResponse.json({ message: '회원가입 성공', error: false }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: '회원가입에 실패하였습니다.', error: true }, { status: 500 });
  }
}