import { getPostRecent } from "@/app/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const post = await getPostRecent();
  return NextResponse.json({ post });
}