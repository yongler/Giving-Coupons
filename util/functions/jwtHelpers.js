export const jwtExtractor = (req) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "").trim();
  } else if (req && req.cookies.get("GivingCouponsJWT")) {
    token = req.cookies.get("GivingCouponsJWT");
  }

  return token;
};
