// import { getPostDetail } from "@/app/service/posts";
import { getPostById } from "@/app/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const post = await getPostById(request.nextUrl.searchParams.get('id') || '');
  return NextResponse.json({ post });
}