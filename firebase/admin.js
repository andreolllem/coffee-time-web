const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
