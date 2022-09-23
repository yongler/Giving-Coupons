import prisma from "../../../lib/prisma";
import crypto from "crypto";
import { base64Decode } from "@firebase/util";

export default async function handler(req, res) {
  try {
    const auth = req.headers.authorization.replace("Basic ", "");
    const [email, password] = base64Decode(auth).trim().split(":");

    const admin = await prisma.admin.findFirst({
      where: {
        email,
      },
    });

    const saltHashedPassword = crypto
      .createHash("sha256")
      .update(email + password)
      .digest("hex");

    if (admin.saltHashedPassword !== saltHashedPassword) {
      throw "Wrong password or email";
    }

    res.status(200).json();
  } catch (err) {
    res.status(401).json({ message: "Not Authorized" });
  }
}
