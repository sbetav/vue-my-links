import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref as dbRef, set, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const db = getDatabase();
const auth = getAuth();

// Get all users
export const getAllUsers = async () => {
  const users = [];
  const snapshot = await get(dbRef(db, "users"));
  snapshot.forEach((childSnapshot) => {
    users.push(childSnapshot.val());
  });
  return users;
};

// Get current user id
export const getUserId = () => {
  return auth.currentUser.uid;
};

// Get current user data once
export const getUserData = async () => {
  const userRef = dbRef(db, "users/" + getUserId());
  const snapshot = await get(userRef);
  const data = snapshot.val();
  return data;
};

// Create a new user in the database
export const createDbUser = async (user) => {
  await set(dbRef(db, "users/" + user.uid), {
    uid: user.uid,
    profileImg:
      "https://firebasestorage.googleapis.com/v0/b/my-links-e27ca.appspot.com/o/default-user.png?alt=media&token=cd735603-2f11-4e82-b835-1c882e5ffe73",
    theme: "gray",
  });
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider).then((data) => {
    if (data._tokenResponse.isNewUser) {
      createDbUser(data.user);
    }
  });
};

// Upload profile image
export const uploadProfileImg = async (file) => {
  const storage = getStorage();
  const imgRef = storageRef(storage, "profile-images/" + getUserId());
  // Upload image
  await uploadBytes(imgRef, file).then((snapshot) => {
    // Get download URL
    getDownloadURL(snapshot.ref).then((url) => {
      // Update user profile image
      set(dbRef(db, "users/" + getUserId() + "/profileImg"), url);
    });
  });
};
