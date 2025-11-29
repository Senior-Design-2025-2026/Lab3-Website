document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('passwordEntered') !== null && localStorage.getItem('passwordEntered') == 'true') {
    window.location.replace('secret.html');
  }
});

document.getElementById('btn').addEventListener('click', async () => {
  const input = document.getElementById('fname').value;
  const hash = await sha256(input);

  if (hash == '4c840dbe7101698b1eeac6039609e37bb00f8f093f83062df8ffc7ced1fc025f') {
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