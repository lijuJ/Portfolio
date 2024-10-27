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
// Contact cards
$('.suBCards').click(function(event) {
  event.stopPropagation(); 

 
  $('.suBCards .card-body').slideUp(); 
  $('.suBCards').removeClass('active');

  $(this).find('.card-body').slideToggle();
  $(this).toggleClass('active');
});

$(document).click(function() {
  $('.suBCards .card-body').slideUp();
  $('.suBCards').removeClass('active');
});



// -----------------------
