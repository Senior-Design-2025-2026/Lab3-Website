// Import Firebase v9+ modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
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
const dbRef = ref(db);


document.addEventListener('DOMContentLoaded', function() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
      userId = crypto.randomUUID(); // generates a unique ID
      localStorage.setItem('userId', userId);
      set(ref(db, 'users/' + userId), false)
        .then(() => console.log("User added!"))
        .catch(err => console.error(err));
  } 
  else {

    get(ref(db, 'users/' + userId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const passwordEntered = snapshot.val();
            if (passwordEntered == true) {
              window.location.replace('secret.html');
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
});

// When enter is pressed, we check the hash of the user input with our stored password
document.getElementById('btn').addEventListener('click', async () => {
  let userId = localStorage.getItem('userId');
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
    set(ref(db, 'users/' + userId), true);
    window.location.replace('secret.html');
  } else {
    alert('Incorrect password');
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

