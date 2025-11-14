// Import Firebase v9+ modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, set, child, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', function() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('userId', userId);
    set(ref(db, 'users/' + userId), false)
      .catch(err => console.error(err));
  }
  get(ref(db, 'users/' + userId))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const passwordEntered = snapshot.val();
              if (passwordEntered !== true) {
                window.location.replace('enter-password.html');
              }
            } else {
              window.location.replace('enter-password.html');
            }
          })
          .catch((error) => {
            console.error(error);
          });
});

document.getElementById('btn').addEventListener('click', () => {
  const inbox = document.getElementById('inbox');

  get(messagesRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesArray = Object.values(messagesData);

        inbox.innerHTML = messagesArray.map((msg) => `
          <div class="message">
            <strong>To: ${msg.to}</strong> <strong>From: ${msg.name}</strong> <small>(${msg.email})</small>
            <br><small>${new Date(msg.timestamp).toLocaleString()}</small>
            <p>${msg.message.replace(/\n/g, '<br>')}</p>
          </div>
        `).join('');
      } else {
        inbox.innerHTML = '<p>No messages found.</p>';
      }
    })
    .catch((error) => {
      console.error(error);
      inbox.innerHTML = '<p>Error loading messages.</p>';
    });
});