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

  // Navigation Active Highlight on Scroll
  const sections = document.querySelectorAll('#rinukz-gl-section, #rinukz-accounting-section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = 'rinukz-gl-section'; // default fallback
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Subtracting offset for top menu (60px nav + 40px buffer)
      if (scrollPos >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });
});
