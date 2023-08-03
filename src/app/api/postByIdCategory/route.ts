import { getPostByIdCategory } from "@/app/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const post = await getPostByIdCategory(request.nextUrl.searchParams.get('category') || '', request.nextUrl.searchParams.get('id') || '');
  return NextResponse.json({ post });
}