import { getCategories } from "@/app/service/categories"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const categories = await getCategories();
  return NextResponse.json({ categories });
}