(() => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'secondary';
  button.textContent = 'Download HTML for Thunderbird';
  document.querySelector('.actions').appendChild(button);
  button.addEventListener('click', () => {
    if (!valid()) return;
    const details = getDetails();
    const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>GEMS email signature</title></head><body>' + signatureHtml(details) + '</body></html>';
    const url = URL.createObjectURL(new Blob([html], {type: 'text/html;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GEMS-' + details.name.replace(/[^a-zA-Z0-9]+/g, '-') + '-Signature.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    message('HTML downloaded. In Thunderbird, open Account Settings, select your account, enable Attach the signature from a file instead, and choose this HTML file.');
  });
  const guide = document.createElement('details');
  guide.innerHTML = '<summary>How to add it to Thunderbird</summary><ol><li>Enter your details and select <strong>Download HTML for Thunderbird</strong>.</li><li>Save the HTML file somewhere permanent on your computer.</li><li>Open Thunderbird’s <strong>Account Settings</strong> and select your email account.</li><li>Enable <strong>Attach the signature from a file instead</strong>, then select <strong>Choose</strong> and select the downloaded HTML file.</li><li>Compose an HTML-formatted message and send yourself a test email.</li></ol><p>The logos use hosted images. Some recipients may need to allow remote images to see them.</p>';
  document.querySelector('.instructions').appendChild(guide);
})();
