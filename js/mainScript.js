// 變更header樣式

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("headerStyle").style.height = "60px";
    document.getElementById("headerStyle").style.boxShadow = "0 3px 5px rgb(189, 189, 189";
    document.getElementById("navLinkes").style.lineHeight = "60px";
    document.getElementById("navLogin").style.margin = "8px 20px 0 auto";
    document.getElementById("openMenu").style.margin = "10px auto auto 85%";

  } else {
    document.getElementById("headerStyle").style.height = "80px";
    document.getElementById("headerStyle").style.boxShadow = "0 0px 0px rgb(189, 189, 189";
    document.getElementById("navLinkes").style.lineHeight = "80px";
    document.getElementById("navLogin").style.margin = "18px 20px 0 auto";
    document.getElementById("openMenu").style.margin = "20px auto auto 85%";
  }
}

// 手機板header選單
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

// 內容摺疊
var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// 卡片輪播
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("cards");
  let windowWidth = window.innerWidth;
  console.group(windowWidth)
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

