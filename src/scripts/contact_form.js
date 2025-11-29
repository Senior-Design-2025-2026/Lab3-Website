// emails
const memberEmails = {
  'Steven': 'steven-j-austin@uiowa.edu',
  'Sage': 'sage-marks@uiowa.edu',
  'Matthew': 'matthew-krueger@uiowa.edu',
  'Zack': 'zack-mulholland@uiowa.edu'
};

function onSubmitted(to) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const entry = { to, name, email, message, date: new Date().toISOString() };
  let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages.push(entry);
  localStorage.setItem('contactMessages', JSON.stringify(messages));
  
  // Send email to the member
  const memberEmail = memberEmails[to];
  if (memberEmail) {
    const subject = encodeURIComponent('CONTACT FORM LAB 3');
    const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:${memberEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
}