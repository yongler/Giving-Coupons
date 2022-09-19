import { NextResponse } from "next/server";

export default async function middleware(req) {
  NextResponse.next();
}
