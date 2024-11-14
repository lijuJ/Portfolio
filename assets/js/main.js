  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });



// TO set active for the selcted a tags in header
const navLinks = document.querySelectorAll('#navmenu ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
  });
});

//for text below name animation

const typedItems = ["Web Application Developer.", "Software Developer."];
  
let currentIndex = 0;  
let charIndex = 0;     
let isDeleting = false; 
let typingSpeed = 150;  
let delayBetweenWords = 2000; 
const typedTextElement = document.querySelector('.typed');
function type() {
  const currentItem = typedItems[currentIndex]; 

  if (isDeleting) {
    charIndex--;
    typedTextElement.textContent = currentItem.substring(0, charIndex);
  } else {
    charIndex++;
    typedTextElement.textContent = currentItem.substring(0, charIndex);
  }

  let currentSpeed = isDeleting ? typingSpeed / 2 : typingSpeed;

  if (!isDeleting && charIndex === currentItem.length) {
    currentSpeed = delayBetweenWords; 
    isDeleting = true;  
  } 
  else if (isDeleting && charIndex === 0) {
    isDeleting = false; 
    currentIndex = (currentIndex + 1) % typedItems.length;  
    currentSpeed = 500; 
  }

  setTimeout(type, currentSpeed);
}
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(type, typingSpeed); 
});


//to make the nav menu active based on the section which is in screen
let navmenulinks = document.querySelectorAll('.navmenu a');

function navmenuScrollspy() {
  navmenulinks.forEach(navmenulink => {
    if (!navmenulink.hash) return;
    let section = document.querySelector(navmenulink.hash);
    if (!section) return;
    let position = window.scrollY + 200;
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
      navmenulink.classList.add('active');
    } else {
      navmenulink.classList.remove('active');
    }
  })
}
window.addEventListener('load', navmenuScrollspy);
document.addEventListener('scroll', navmenuScrollspy);


// -----------------------carousal
$('.we-carousel').each(function() {
  let currentCardIndex = 0; // Current index for the specific carousel
  const $carousel = $(this); // Current carousel
  const $cards = $carousel.find('.we-card'); // All cards within the current carousel
  const totalCards = $cards.length; // Total cards in the current carousel

  function updateCarousel() {
      // Remove classes from all cards
      $cards.removeClass('active prev-1 next-1 prev-2 next-2 prev-3 next-3');
      // Add active class to the current card
      $($cards[currentCardIndex]).addClass('active');

      // Calculate indices for neighboring cards
      const prevIndex_1 = (currentCardIndex - 1 + totalCards) % totalCards;
      const nextIndex_1 = (currentCardIndex + 1) % totalCards;
      const prevIndex_2 = (currentCardIndex - 2 + totalCards) % totalCards;
      const nextIndex_2 = (currentCardIndex + 2) % totalCards;
      const prevIndex_3 = (currentCardIndex - 3 + totalCards) % totalCards;
      const nextIndex_3 = (currentCardIndex + 3) % totalCards;

      // Add classes to neighboring cards
      $($cards[prevIndex_1]).addClass('prev-1');
      $($cards[nextIndex_1]).addClass('next-1');
      $($cards[prevIndex_2]).addClass('prev-2');
      $($cards[nextIndex_2]).addClass('next-2');
      $($cards[prevIndex_3]).addClass('prev-3');
      $($cards[nextIndex_3]).addClass('next-3');
  }

  // Initial update to set the correct card state
  updateCarousel();

  // Right arrow click event
  $carousel.find('.right').click(function () {
      currentCardIndex = (currentCardIndex + 1) % totalCards; // Increment index
      updateCarousel(); // Update carousel display
  });

  // Left arrow click event
  $carousel.find('.left').click(function () {
      currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards; // Decrement index
      updateCarousel(); // Update carousel display
  });
});
// to popup if card get clicked 
function openModal(card) {

  const img = card.querySelector("img");
  const header = card.querySelector("h5");
  const paragraph = card.querySelector("p");

  if (img && header && paragraph) {
      // Populate the modal content with the card's data
      document.getElementById("modalImg").src = img.src;
      document.getElementById("modalHeader").textContent = header.textContent;
      document.getElementById("modalParagraph").textContent = paragraph.textContent;

      // Show the Bootstrap modal
      const imgModal = new bootstrap.Modal(document.getElementById("imgModal"));
      imgModal.show();
  } else {
      console.error("Could not find expected elements in the card.");
  }
}



// for mail
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from redirecting

  const formData = new FormData(this);

  fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Show Bootstrap toast with a 2-second delay
          const toastElement = document.getElementById("successToast");
          const toast = new bootstrap.Toast(toastElement, { delay: 2000 }); // Set delay to 2 seconds
          toast.show();
          
          // Clear the form fields
          this.reset();
      } else {
          alert("An error occurred. Please try again.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
  });
});