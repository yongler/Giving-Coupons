import { SignJWT } from "jose";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { username, password } = req.body;
  const secret = process.env.SECRET;

  if (username == "Admin" && password == "Admin") {
    const tokenLifeTime = 60 * 20; // 20 minutes
    const token = await new SignJWT({ userId: username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(tokenLifeTime + "s")
      .sign(new TextEncoder().encode(secret));

    const serializedCookie = serialize("GivingCouponsJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: tokenLifeTime,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedCookie);
    res.status(200).json({ message: "Successfully logged in" });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
}
