function onSubmitted(to) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const entry = { to, name, email, message, date: new Date().toISOString() };
  
  let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages.push(entry);
  localStorage.setItem('contactMessages', JSON.stringify(messages));
}