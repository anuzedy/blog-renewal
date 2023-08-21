import { getGroups } from "@/app/service/categories"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const groups = await getGroups();
  return NextResponse.json({ groups });
}

export const revalidate = 0;