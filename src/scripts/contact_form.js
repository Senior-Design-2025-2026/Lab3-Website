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

// emails
const memberEmails = {
  'Steven': 'steven-j-austin@uiowa.edu',
  'Sage': 'sage-marks@uiowa.edu',
  'Matthew': 'matthew-krueger@uiowa.edu',
  'Zack': 'zack-mulholland@uiowa.edu'
};

// Add form handlers if the form exists
function attachFormHandler(id, name) {
  const form = document.getElementById(id);
  if (!form) return; // form doesn't exist on this page

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmitted(name);
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  attachFormHandler('matthew-form', 'Matthew');
  attachFormHandler('sage-form', 'Sage');
  attachFormHandler('steven-form', 'Steven');
  attachFormHandler('zack-form', 'Zack');
});

function onSubmitted(to) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // // Send email to the member
  // const memberEmail = memberEmails[to];
  // if (memberEmail) {
  //   const subject = encodeURIComponent('CONTACT FORM LAB 3');
  //   const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
  //   const mailtoLink = `mailto:${memberEmail}?subject=${subject}&body=${body}`;
  //   window.location.href = mailtoLink;
  // }
  
  push(messagesRef, { to, name, email, message, timestamp: Date.now() })
    .then(() => console.log("Message added!"))
    .catch(err => console.error(err));
}