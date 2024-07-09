// const headerCheck = document.querySelector(".headerStyle")
// function headermove() {
//   const moveToNextAt = (headerCheck.offsetTop) + (headerCheck.clientHeight / 2);
//   if (window.scrollY > moveToNextAt) {
//     if (headerCheck.classList.contains('headerSticky') == false) {
//         headerCheck.classList.add('headerSticky');
//     }
//   } else {
//     if (headerCheck.classList.contains('headerSticky') == true) {
//         headerCheck.classList.remove('headerSticky');
//     }
//   }
// }
// window.addEventListener('scroll', debounce(headermove));


// function debounce(fn, delay = 500) {
//     let timer;
  
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         fn(...args);
//       }, delay);
//     };
//   }

// 變更header樣式

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("headerStyle").style.height = "60px";
      document.getElementById("headerStyle").style.boxShadow = "0 3px 5px rgb(189, 189, 189";
      document.getElementById("navLinkes").style.lineHeight = "60px";
      document.getElementById("navLogin").style.margin = "8px 20px 0 auto";
      
    } else {
        document.getElementById("headerStyle").style.height = "80px";
        document.getElementById("headerStyle").style.boxShadow = "0 0px 0px rgb(189, 189, 189";
        document.getElementById("navLinkes").style.lineHeight = "80px";
        document.getElementById("navLogin").style.margin = "18px 20px 0 auto";
    }
  }