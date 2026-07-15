document.addEventListener('DOMContentLoaded', () => {
  const emailBox = document.getElementById('email-box-copy');
  const emailQuick = document.getElementById('email-quick-copy');
  const toastMsg = document.getElementById('copy-toast-msg');

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.innerText = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2500);
  }

  if (emailBox) {
    emailBox.addEventListener('click', () => {
      navigator.clipboard.writeText('rinukzstore@gmail.com').then(() => {
        showToast('คัดลอกอีเมล rinukzstore@gmail.com เรียบร้อยแล้ว!');
      }).catch(err => console.error(err));
    });
  }

  if (emailQuick) {
    emailQuick.addEventListener('click', () => {
      navigator.clipboard.writeText('rinukzstore@gmail.com').then(() => {
        showToast('คัดลอกอีเมล rinukzstore@gmail.com เรียบร้อยแล้ว!');
      }).catch(err => console.error(err));
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
