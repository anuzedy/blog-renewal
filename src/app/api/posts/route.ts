import { getPostsAll } from "@/app/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const posts = await getPostsAll();
  return NextResponse.json({ posts });
}

export const revalidate = 0;