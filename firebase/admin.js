const admin = require("firebase-admin");

const serviceAccount = require(JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
