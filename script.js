let currentAudio = null;
let contractAccepted = false;

function acceptContract(event) {
  // Prevent multiple clicks
  if (contractAccepted) return;
  contractAccepted = true;
  
  // Play song
  currentAudio = new Audio('song.mp3'); // Replace 'song.mp3' with your song file path
  currentAudio.play().catch(err => console.log('Audio playback failed:', err));
  
  // Create floating hearts animation
  const button = event.target;
  button.textContent = "Contract Accepted! 💕";
  button.style.cursor = 'not-allowed';
  button.style.opacity = '0.7';
  button.textContent = "Contract Accepted! 💕";
  // Use CSS variable for success color
  const successColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-button-success').trim();
  const successColorDark = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-button-success-dark').trim();
  button.style.background = `linear-gradient(135deg, ${successColor} 0%, ${successColorDark} 100%)`;
  
  // Create hearts
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 100);
  }
  
  setTimeout(() => {
    showModal();
  }, 1500);
}

function createHeart() {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 'px';
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
  heart.style.opacity = '1';
  heart.style.transition = 'all 3s ease-out';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.style.top = '-100px';
    heart.style.opacity = '0';
    heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
  }, 10);
  
  setTimeout(() => {
    heart.remove();
  }, 3000);
}

function showModal() {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  // Create modal content
  const modal = document.createElement('div');
  modal.className = 'modal-content';
  modal.innerHTML = `
    <h2>I like me better when... ❤️</h2>
    <p>Signature locked. Lifetime binding. Back button disabled.</p>
    <p>Here's to forever. 💕</p>
    <button class="modal-close-btn">Close</button>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Make close button run away on hover
  const closeBtn = modal.querySelector('.modal-close-btn');
  const buttonTexts = [
    'Close',
    'Told you',
    'No point trying',
    'Stop already',
    'Give up',
    'Not happening',
    'Nice try',
    'Still here?',
    'Forever means forever',
    'Did you forget?',
    'Contract is binding',
    'Lifetime warranty',
    'No refunds',
    'You clicked Accept',
    'Too late now',
    'Locked in',
    'No rollbacks',
    'System override denied',
    'Access denied',
    'No escape 💕',
  ];
  let textIndex = 0;
  
  // Function to move button to random position and change text
  function moveButton() {
    const modalRect = modal.getBoundingClientRect();
    const btnRect = closeBtn.getBoundingClientRect();
    
    // Calculate random position within modal bounds
    const maxX = modalRect.width - btnRect.width - 40; // 40px padding
    const maxY = modalRect.height - btnRect.height - 40;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    closeBtn.style.position = 'absolute';
    closeBtn.style.left = randomX + 'px';
    closeBtn.style.top = randomY + 'px';
    closeBtn.style.transition = 'all 0.3s ease';
    
    // Change button text
    textIndex = (textIndex + 1) % buttonTexts.length;
    closeBtn.textContent = buttonTexts[textIndex];
  }
  
  // Function to reset button
  function resetButton() {
    closeBtn.style.position = 'relative';
    closeBtn.style.left = '0';
    closeBtn.style.top = '0';
    textIndex = 0;
    closeBtn.textContent = buttonTexts[0];
  }
  
  // Desktop: Reset button position when mouse leaves modal
  modal.addEventListener('mouseleave', resetButton);
  
  // Desktop: Move button on hover
  closeBtn.addEventListener('mouseenter', moveButton);
  
  // Mobile: Move button on touch
  closeBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent default touch behavior
    moveButton();
  });
  
  // Mobile: Reset when touching outside modal
  overlay.addEventListener('touchstart', function(e) {
    if (e.target === overlay) {
      resetButton();
    }
  });
}
