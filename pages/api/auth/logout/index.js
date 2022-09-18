import { serialize } from "cookie";

export default async function handler(req, res) {
  const cookies = res.cookies;
  const jwt = cookies.GivingCouponsJWT;

  if (!jwt) {
    res.statusCode(400).json({ message: "Already logged out" });
  } else {
    const serializedCookie = serialize("GivingCouponsJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedCookie);
    res.status(200).json({ message: "Successfully logged out" });
  }
}
