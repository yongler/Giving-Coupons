import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { jwtExtractor } from "/util/functions/jwtHelpers";

export default async function middleware(req) {
  const secret = process.env.SECRET;
  const url = process.env.URL;

  const jwt = jwtExtractor(req);
  const path = req.nextUrl.pathname;

  if (path.includes("/admin")) {
    if (!jwt) {
      return NextResponse.redirect(url.concat("/login"));
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(url.concat("/login"));
    }
  }

  if (path.includes("/login")) {
    if (!jwt) {
      return NextResponse.next();
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret));
      return NextResponse.redirect(url.concat("/admin"));
    } catch (err) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
