const lazyImages = $("img.lazy");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if(!src) {
    return;
  }
  // else {
    img.src=src;
    img.classList.remove("lazy");
  }


const imgOptions = {
  threshold: .1,
  rootMargin: "0px 0px 50px 0px"
};

const imgObserver = new IntersectionObserver((entries,
   imgObserver) => {
     entries.forEach(entry => {
  if (!entry.isIntersecting) {
    return;
  } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
  }
});
}, imgOptions);

Array.from(lazyImages).forEach(image => {
  imgObserver.observe(image);
});
















// const observer = new IntersectionObserver(lazyLoad, {
//  rootMargin: "100px",
//  threshold: 1.0
//
// });


// function lazyLoad(elements) {
//   elements.forEach(image => {
//     if (image.intersectionRatio > 0) {
//       image.src=image.dataset.src;
//       observer.unobserve(item.target);
//       image.removeClass("lazy");
//     };
//   });
// };
//
// Array.from(lazyImages).forEach(img => {
//   observer.observe(img);
// });
