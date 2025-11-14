// Import Firebase v9+ modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, child, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2xT5fNZCbfzuhL_Q46rGz9YQk3Q0fwY4",
  authDomain: "seniordesignlab3-9eca4.firebaseapp.com",
  projectId: "seniordesignlab3-9eca4",
  storageBucket: "seniordesignlab3-9eca4.firebasestorage.app",
  messagingSenderId: "319422658712",
  appId: "1:319422658712:web:42528723a1b678226eb8ed",
  measurementId: "G-WFSNP4L9E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');

document.getElementById('submitButton').addEventListener('click', () => {
  const to = document.getElementById('submitButton').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  push(messagesRef, { to, name, email, message, timestamp: Date.now() })
    .then(() => console.log("Message added!"))
    .catch(err => console.error(err));
});