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
                window.location.replace('../admin/enter-password.html');
              } else {
                  // Auto-load messages when page loads
                  displayMessages();
              }
            } else {
              window.location.replace('../admin/enter-password.html');
            }
          })
          .catch((error) => {
            console.error(error);
          });
});

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
}

function displayMessages() {
  const inbox = document.getElementById('inbox');
  const stats = document.getElementById('inbox-stats');

  get(messagesRef)
    .then((snapshot) => {

      let messages = [];

      if (snapshot.exists()) {
        messages = Object.values(snapshot.val());
      }
 

      // Update stats
      const messageCount = messages.length;
      if (messageCount === 0) {
        stats.innerHTML = '<p class="stats-text">No messages in inbox</p>';
        inbox.innerHTML = `
          <div class="empty-state">
            <p class="empty-text">No messages yet. Messages will appear here when users submit the contact form.</p>
          </div>
        `;
        return;
      }

      stats.innerHTML = `<p class="stats-text"><strong>${messageCount}</strong> ${messageCount === 1 ? 'message' : 'messages'} in inbox</p>`;

      // Generate email list
      inbox.innerHTML = messages.map((msg, index) => `
        <div class="email-item">
          <div class="email-header">
            <div class="email-meta">
              <div class="email-from">
                <span>${escapeHtml(msg.name)}</span>
                <span class="email-address">(${escapeHtml(msg.email)})</span>
              </div>
              <div class="email-to">To: ${escapeHtml(msg.to)}</div>
              <div class="email-date">${formatDate(msg.timestamp)}</div>
            </div>
          </div>
          <div class="email-body">${escapeHtml(msg.message).replace(/\n/g, '<br>')}</div>
        </div>
      `).join('');
     })
    .catch((error) => {
      console.error(error);
      inbox.innerHTML = '<p>Error loading messages.</p>';
    });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

window.displayMessages = displayMessages;