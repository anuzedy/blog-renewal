// import { getPostDetail } from "@/app/service/posts";
import { createPost, getPostById } from "@/app/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const post = await getPostById(request.nextUrl.searchParams.get('id') || '');
  return NextResponse.json({ post });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const form = await request.formData();
  const thumbnail = form.get('thumbnail') as Blob;
  const title = form.get('title')?.toString();
  const description = form.get('description')?.toString();
  const category = form.get('category')?.toString();
  const content = form.get('content')?.toString();

  if (!thumbnail || !title || !description || !category || !content) {
    return new Response('Bad Request', { status: 400 });
  }

  const post = await getPostById(request.nextUrl.searchParams.get('id') || '');
  return createPost({ userId: user.id, thumbnail, title, description, category, content })
    .then((res) => NextResponse.json(res));
}