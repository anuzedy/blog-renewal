import { getGroups2 } from "@/app/service/categories"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const groups = await getGroups2();
  return NextResponse.json({ groups });
}