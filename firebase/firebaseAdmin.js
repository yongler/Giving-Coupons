import * as firebaseAdmin from "firebase-admin";
require("firebase/auth");

// get this JSON from the Firebase board
const serviceAccount = require("./adminConfig.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
  });
}

export { firebaseAdmin };
