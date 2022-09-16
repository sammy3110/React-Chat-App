import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";

function initializeFirestore() {
  const firebaseConfig = {
    apiKey: "AIzaSyCq2M3a4B4vOoS-wBlloUMhJzPUiCyafyQ",
    authDomain: "react-chat-app-2da0b.firebaseapp.com",
    projectId: "react-chat-app-2da0b",
    storageBucket: "react-chat-app-2da0b.appspot.com",
    messagingSenderId: "360271359722",
    appId: "1:360271359722:web:a99f6999358d6caf307193",
  };

  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

export const database = initializeFirestore();

async function getChat(chat_title) {
  const all_messages = [];
  try {
    onSnapshot(
      collection(database, "messages", "0rb3m_5fz8ai", "chat"),
      (chatSnap) => {
        chatSnap.forEach((snap) => all_messages.push({...snap.data(), id: snap.id}));
        // console.log(all_messages);
      }
    );
    return all_messages;
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}

export function createUniqueId(user1, user2) {
  const unique1 = user1.unique;
  const unique2 = user2.unique;
  return [unique1, unique2].sort().join("_");
}

export async function startChat(user1, user2) {
  const unique_id = createUniqueId(user1, user2);
  const res = await getChat(unique_id);
  // console.log(res);
  return res;
}

export function sendMessage(sender, receiver, message) {
  // console.log(chat_title);
  const chat_title = createUniqueId(sender, receiver);
  try {
    setDoc(
      doc(database, "messages", chat_title, "chat", Date.now().toString()),
      {
        // seen: false,
        sender: sender.unique,
        message: message,
      }
    );
    // console.log("Message sent.");
    // return "User created.";
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}


export async function getAllUsers() {
  const all_users = [];

  const querySnapshot = await getDocs(collection(database, "users"));
  querySnapshot.forEach((user) => {
    all_users.push(user.data());
  });
  return all_users;
}

export async function getUser(userId, password = null) {
  try {
    if (userId.length === 0 || password.length === 0) return "ERROR";
  } catch (error) {
    console.log(error);
  }
  const docRef = doc(database, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such User!");
    return null;
  }
}

export async function addUser(name, email, password, confirm_password) {
  if (
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    confirm_password !== password
  )
    return;
  // Check duplicate
  const user = await getUser(email);
  // console.log(user);

  if (user) return `User with email ${email} already present.`;
  try {
    await setDoc(doc(database, "users", email), {
      unique: (Math.random() + 1).toString(36).substring(7),
      name: name,
      email: email,
      password: password,
    });
    return "User created.";
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}

// export default {addUser, getUser};
