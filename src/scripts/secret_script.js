document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('passwordEntered') == null || localStorage.getItem('passwordEntered') == 'false') {
        window.location.replace('../admin/enter-password.html');
    }
});

function displayMessages() {
  const inbox = document.getElementById('inbox');
  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

  if (messages.length === 0) {
    inbox.innerHTML = '<p><em>No messages yet.</em></p>';
    return;
  }

  inbox.innerHTML = messages.map((msg, index) => `
    <div class="message">
      <strong>To: ${msg.to} </strong><strong>From: ${msg.name}</strong> <small>(${msg.email})</small>
      <br><small>${msg.date}</small>
      <p>${msg.message.replace(/\n/g, '<br>')}</p>
    </div>
  `).join('');
}