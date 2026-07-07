document.addEventListener('DOMContentLoaded', () => {
  const emailBox = document.getElementById('email-box-copy');
  const toastMsg = document.getElementById('copy-toast-msg');

  if (emailBox && toastMsg) {
    emailBox.addEventListener('click', () => {
      const email = 'rinukzstore@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        // Show Toast
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
});
