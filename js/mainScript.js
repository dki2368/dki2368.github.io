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