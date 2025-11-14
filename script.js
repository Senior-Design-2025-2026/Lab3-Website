// Import Firebase v9+ modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Example: read value at /users/user1/name
const dbRef = ref(db);


document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('passwordEntered') !== null && localStorage.getItem('passwordEntered') == 'true') {
    window.location.replace('secret.html');
  }
});

document.getElementById('btn').addEventListener('click', async () => {
  const input = document.getElementById('fname').value;
  const hash = await sha256(input);
  const snapshot = await get(child(dbRef, 'passwordHash'));
  let hashedPassword;
  if (snapshot.exists()) {
    hashedPassword = snapshot.val();
    console.log("Value:", hashedPassword);
  } else {
    hashedPassword = "wrongPassword";
  }

  if (hash == hashedPassword) {
    alert('Correct password');
    localStorage.setItem('passwordEntered', 'true');
    window.location.replace('secret.html');
  } else {
    alert('Incorrect password');
    localStorage.setItem('passwordEntered', 'false');
  }
});


// https://stackoverflow.com/questions/18338890/are-there-any-sha-256-javascript-implementations-that-are-generally-considered-t
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

