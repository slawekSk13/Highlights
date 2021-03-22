$(".category-image").hover(function() {
    this.src=this.dataset.src;
},
function() {
  this.src=this.dataset.src2;
});
