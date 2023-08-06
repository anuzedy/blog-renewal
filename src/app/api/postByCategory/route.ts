import { getPostByCategory } from "@/app/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const posts = await getPostByCategory(request.nextUrl.searchParams.get('category') || '');
  return NextResponse.json({ posts });
}