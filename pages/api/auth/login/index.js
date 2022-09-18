import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { username, password } = req.body;
  const secret = process.env.SECRET;

  if (username == "Admin" && password == "Admin") {
    const tokenLifeTime = 60 * 20; // 20 minutes
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + tokenLifeTime,
        username: username,
      },
      secret
    );

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
    res.json({ message: "Not Authorized" });
  }
}
