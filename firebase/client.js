import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC8BN6keF_E8KFNBolBnR4B2aPXGAxuoc4",
  authDomain: "coffe-time-f480c.firebaseapp.com",
  projectId: "coffe-time-f480c",
  databaseURL: "https://coffe-time-f480c.firebaseio.com",
  storageBucket: "coffe-time-f480c.appspot.com",
  messagingSenderId: "80768056515",
  appId: "1:80768056515:web:d3757933b7aba737f07676",
  measurementId: "G-W7V24MQWR5",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;

    onChange(normalizedUser);
  });
};

export const loginWithFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider);
};

export const addCoffee = ({ avatar, userName, content, userId, img }) => {
  return db.collection("coffees").add({
    avatar,
    userName,
    userId,
    content,
    img,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

const mapCoffesFromFirebaseToCoffeeObject = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export const listenLatestCoffees = (callback) => {
  return db
    .collection("coffees")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newCoffees = docs.map(mapCoffesFromFirebaseToCoffeeObject);
      callback(newCoffees);
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
