import { serialize } from "cookie";
import { jwtExtractor } from "../../../../util/functions/jwtHelpers";

export default async function handler(req, res) {
  const jwt = jwtExtractor(req);

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
