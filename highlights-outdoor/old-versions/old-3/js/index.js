

// toggle between list/grid

const imageList = document.querySelector(".image-list");
const btns = document.querySelectorAll(".view-options button");
const imageListItems = document.querySelectorAll(".image-list li");
const active = "active";
const listView = "list-view";
const gridView = "grid-view";
const dNone = "invisible";

for (const btn of btns) {
  btn.addEventListener("click", function() {
    const parent = this.parentElement;
    document.querySelector(".view-options .active").classList.remove(active);
    parent.classList.add(active);
    this.disabled = true;
    document.querySelector('.view-options [class^="show-"]:not(.active) button').disabled = false;

    if (parent.classList.contains("show-list")) {
      parent.previousElementSibling.previousElementSibling.classList.add(dNone);
      imageList.classList.remove(gridView);
      imageList.classList.add(listView);
    } else {
      parent.previousElementSibling.classList.remove(dNone);
      imageList.classList.remove(listView);
      imageList.classList.add(gridView);
    }
  });
}

// update CSS

const rangeInput = document.querySelector('input[type = "range"]');

rangeInput.addEventListener("input", function() {
  document.documentElement.style.setProperty("--minRangeValue", `${this.value}px`);
});


// wyszukiwanie

var notSeeOnLoad = ["trekking", "ski", "running", "studio", "military"];
const photosCounter = $(".toolbar .counter span");
for (var i=0; i < notSeeOnLoad.length; i++){
$("."+notSeeOnLoad[i]).toggleClass("invisible");
}

$(":checkbox").click(visibilityToggler);
$(":checkbox").click(showedReset);
$(":checkbox").click(visibleCounter);

function visibilityToggler () {
$("."+this.id).toggleClass("invisible");
}



// włączanie i wyłączanie fullscreen przez kliknięcie
function a () {
  $(".previous").toggleClass("invisible");
  $(".next").toggleClass("invisible");
  $(".close").toggleClass("invisible");
  if (this.classList.contains("pion")) {
    this.classList.toggle("fullscreen-pion");
    previousNextStyle();
  } else {
    this.classList.toggle("fullscreen");
  }
}

$(".galeria img").click(a);
$(".galeria img").click(showedReset);
$(".galeria img").click(visibleCounter);
$(".galeria img").click(fullscreenPhotoIdentity);


// wyłączanie fullscreen przez klawiaturę

$("body").keydown(function(e) {
  if (e.keyCode == 37) { //left
    previous();
  } else if (e.keyCode == 39) { //right
    next();
  } else {
    removeFullscreen();
    $(".previous").addClass("invisible");
    $(".next").addClass("invisible");
    $(".close").addClass("invisible");
  }
});

function removeFullscreen () {
  $("img").removeClass("fullscreen");
  $("img").removeClass("fullscreen-pion");
  $(".close").addClass("invisible");
  $(".previous").addClass("invisible");
  $(".next").addClass("invisible");
}

$(".previous").click(previous);
$(".next").click(next);
$(".close").click(removeFullscreen);

// stylizacja previous next
function previousNextStyle () {
$(".previous").toggleClass("previous-pion");
$(".next").toggleClass("next-pion");
}

// ile zdjęć widocznych

var showedImages = [];
let counter = 1;


function showedReset () {
  showedImages = [];
}


function visibleCounter () {$(".galeria img").each(function() {
if(this.parentElement.parentElement.classList.contains("invisible")===false) {
  showedImages.push(this)
} else {
  console.log("zdjęcie niewidoczne");
}});
$("#licznik").text(showedImages.length);
}
//
var fullscreenPhoto;

function fullscreenPhotoIdentity () {
fullscreenPhoto = showedImages.indexOf(this);
}

// poprzednie i następne fullscreen

function previous () {
  if (showedImages[fullscreenPhoto].classList.contains("fullscreen-pion") || showedImages[fullscreenPhoto].classList.contains("fullscreen")) {
  if (fullscreenPhoto > 0 && showedImages[fullscreenPhoto].classList.contains("pion") && showedImages[fullscreenPhoto-1].classList.contains("pion")){
    showedImages[fullscreenPhoto].classList.toggle("fullscreen-pion");
    showedImages[fullscreenPhoto-1].classList.toggle("fullscreen-pion");
    fullscreenPhoto--;
  } else if (fullscreenPhoto > 0 && showedImages[fullscreenPhoto].classList.contains("pion")) {
    previousNextStyle();
    showedImages[fullscreenPhoto].classList.toggle("fullscreen-pion");
    showedImages[fullscreenPhoto-1].classList.toggle("fullscreen");
    fullscreenPhoto--;
} else if (fullscreenPhoto > 0) {
    showedImages[fullscreenPhoto].classList.toggle("fullscreen");
    showedImages[fullscreenPhoto-1].classList.toggle("fullscreen");
    fullscreenPhoto--;
} else if (fullscreenPhoto === 0 && showedImages[showedImages.length-1].classList.contains("pion")) {
    previousNextStyle();
    showedImages[fullscreenPhoto].classList.toggle("fullscreen");
    showedImages[showedImages.length-1].classList.toggle("fullscreen-pion");
    fullscreenPhoto = showedImages.length-1;
} else {
  showedImages[fullscreenPhoto].classList.toggle("fullscreen");
  showedImages[showedImages.length-1].classList.toggle("fullscreen");
  fullscreenPhoto = showedImages.length-1;
}}}

function next () {
  if (showedImages[fullscreenPhoto].classList.contains("fullscreen-pion") || showedImages[fullscreenPhoto].classList.contains("fullscreen")) {
  if (fullscreenPhoto < showedImages.length-1 && showedImages[fullscreenPhoto].classList.contains("pion") && showedImages[fullscreenPhoto+1].classList.contains("pion"))
    {
    showedImages[fullscreenPhoto].classList.toggle("fullscreen-pion");
    showedImages[fullscreenPhoto+1].classList.toggle("fullscreen-pion");
    fullscreenPhoto++;
  } else if (fullscreenPhoto < showedImages.length-1 && showedImages[fullscreenPhoto+1].classList.contains("pion")) {
    previousNextStyle();
    showedImages[fullscreenPhoto+1].classList.toggle("fullscreen-pion");
    showedImages[fullscreenPhoto].classList.toggle("fullscreen");
    fullscreenPhoto++;
} else if (fullscreenPhoto < showedImages.length-1) {
    showedImages[fullscreenPhoto].classList.toggle("fullscreen");
    showedImages[fullscreenPhoto+1].classList.toggle("fullscreen");
    fullscreenPhoto++;
} else if (fullscreenPhoto === showedImages.length-1 && showedImages[fullscreenPhoto].classList.contains("pion")) {
    previousNextStyle();
    showedImages[fullscreenPhoto].classList.toggle("fullscreen-pion");
    showedImages[0].classList.toggle("fullscreen");
    fullscreenPhoto = 0;
} else {
  showedImages[fullscreenPhoto].classList.toggle("fullscreen");
  showedImages[0].classList.toggle("fullscreen");
  fullscreenPhoto = 0;
}}}
