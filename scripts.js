var Bench_Table = 'https://montclair225.autodesk360.com/shares/public/SH35dfcQT936092f0e43eeaf688337182486?mode=embed" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0" ';
var Metal_Chair = 'https://montclair225.autodesk360.com/g/shares/SH35dfcQT936092f0e43da228a37809cc03d?mode=embed" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0" ';
var Dough_Mixer = 'https://montclair225.autodesk360.com/g/shares/SH35dfcQT936092f0e43e8e02ae73ccad9f9?mode=embed" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ';
var Knife_Handle = 'https://montclair225.autodesk360.com/g/shares/SH35dfcQT936092f0e434b0caddc08fb620a?mode=embed" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ';
var Drive_Pulley = 'https://montclair225.autodesk360.com/g/shares/SH35dfcQT936092f0e43fd87fc9973054022?mode=embed" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ';


// image gallery
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDot", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activeDot";
}


// Mobile Navigation Sticky
let navbar = document.getElementById("mobileNavigation");
let navPos = navbar.getBoundingClientRect().top;
let spacer = document.getElementById("spacer");

window.addEventListener("scroll", e => {
  let scrollPos = window.scrollY;
  if (scrollPos > navPos) {
    navbar.classList.add('sticky');
    spacer.classList.add('navbarOffsetMargin');
  } else {
    navbar.classList.remove('sticky');
    spacer.classList.remove('navbarOffsetMargin');
  }
});


fullscreenContent = document.getElementById("fullscreen");

function openFullscreen(content) {
  div = "<iframe style=\"border:none; \" src=' " + content + " \' </iframe>";
  fullscreenContent.innerHTML += div;
  fullscreenContent.style.display = "block";
}

// document.getElementById('id').style.pointerEvents = 'auto'; 

function closeFullscreen() {
  fullscreenContent.innerHTML = '<div id="exit" onclick="closeFullscreen()">Exit</div>'
  fullscreenContent.style.display = "none";
}

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    closeFullscreen();
  }
});