export const jwtExtractor = (req) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "").trim();
  } else if (req && req.cookies["next-auth.session-token"]) {
    const userCookie = jwt.decode(req.cookies["next-auth.session-token"]);
    token = userCookie.accessToken;
  }

  return token;
};