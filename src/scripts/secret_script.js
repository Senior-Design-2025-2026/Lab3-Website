document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('passwordEntered') == null || localStorage.getItem('passwordEntered') == 'false') {
        window.location.replace('../admin/enter-password.html');
    } else {
        // Auto-load messages when page loads
        displayMessages();
    }
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
  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

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
          <div class="email-date">${formatDate(msg.date)}</div>
        </div>
      </div>
      <div class="email-body">${escapeHtml(msg.message).replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}