// function scrollToView(item) {
//       var navHeight = document.getElementById("Title").offsetHeight;
//       var elementPosition = document.getElementById(item).offsetTop;

//     console.log(navHeight)

//     window.scrollTo({
//         top: elementPosition-navHeight*3,
//         behavior: "smooth"
//    });

// }

// const SHOW_FLOATING_BUTTON_AFTER_SCROLLING = 300;

// // 监听页面的滚动事件
// window.addEventListener('scroll', function () {
//     // 如果页面的滚动距离超过一定值，则显示浮标
//     if (window.scrollY > SHOW_FLOATING_BUTTON_AFTER_SCROLLING) {
//         document.getElementById('floating-button').style.display = 'block';
//     } else {
//         document.getElementById('floating-button').style.display = 'none';
//     }
// });

// function backTo() {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//    });
// }

const componentA = document.querySelector('.map1')
const componentB = document.querySelector('.map2')
let showA = true
componentA.style.display = 'block'
componentB.style.display = 'none'

function toggle() {
  if (showA) {
    componentA.style.display = 'none'
    componentB.style.display = 'block'
  } else {
    componentA.style.display = 'block'
    componentB.style.display = 'none'
  }
  showA = !showA
}
