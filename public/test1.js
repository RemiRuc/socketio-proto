/********** GESTION DES PAGES **********/
var pageTest1 = document.getElementById('page-test1');
var pageTest2 = document.getElementById('page-test2');
var pageTest3 = document.getElementById('page-test3');
var button1 = document.getElementById('button_test1');
var button2 = document.getElementById('button_test2');
var button3 = document.getElementById('button_test3');
var title1 = document.querySelector('.title1');

// Get DOM elements
var input = document.getElementById("input");
var output = document.getElementById("output");

/*************************************/
/************** TEST 2 **************/
/***********************************/
function startDrag(e) {
  this.ontouchmove = this.onmspointermove = moveDrag;
  this.ontouchend = this.onmspointerup = function () {
    this.ontouchmove = this.onmspointermove = null;
    this.ontouchend = this.onmspointerup = null;
  }
  var pos = [this.offsetLeft, this.offsetTop];
  var that = this;
  var origin = getCoors(e);
  function moveDrag(e) {
    var currentPos = getCoors(e);
    var deltaX = currentPos[0] - origin[0];
    var deltaY = currentPos[1] - origin[1];
    this.style.left = (pos[0] + deltaX) + 'px';
    this.style.top = (pos[1] + deltaY) + 'px';
    return false; // cancels scrolling
  }
  function getCoors(e) {
    var coors = [];
    if (e.targetTouches && e.targetTouches.length) {
      var thisTouch = e.targetTouches[0];
      coors[0] = thisTouch.clientX;
      coors[1] = thisTouch.clientY;
    } else {
      coors[0] = e.clientX;
      coors[1] = e.clientY;
    }
    return coors;
  }
}
var elements = document.querySelectorAll('.test-element');
[].forEach.call(elements, function (element) {
  element.ontouchstart = element.onmspointerdown = startDrag;
});
document.ongesturechange = function () {
  return false;
}
/********** ACTIVATION PAGE 1 *********/
button1.onclick = function () {
  socket.emit("change_page1");
}
socket.on("change_page1", function () {
  pageTest1.style.display = "block";
  pageTest2.style.display = "none";
  pageTest3.style.display = "none";
  title1.style.display = "none";
});
/*************************************/
/************** TEST 1 **************/
/***********************************/
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function () {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
}
var ball;
var w;
var h;
function init() {
  ball = document.getElementById("ball");
  w = window.innerWidth;
  h = window.innerHeight;
  ball.style.left = (w / 2) - 50 + "px";
  ball.style.top = (h / 2) - 50 + "px";
  ball.velocity = { x: 0, y: 0 }
  ball.position = { x: 0, y: 0 }
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
      socket.emit("animation", {beta:event.beta, gamma:event.gamma, alpha:event.alpha});
    })
  }
  else {
    alert("Sorry, your browser doesn't support Device Orientation");
  };
    update();
}
socket.on("animation", function(data){
  if (ball){
      ball.velocity.y = Math.round(-data.beta)/2;
      ball.velocity.x = Math.round(data.gamma)/2;
      // document.getElementById("doTiltLR").innerHTML = Math.round(data.beta);
      // document.getElementById("doTiltFB").innerHTML = Math.round(data.gamma);
      // document.getElementById("doDirection").innerHTML = Math.round(data.alpha);
  }
});

function update() {
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;
  if (ball.position.x > (w - 100) && ball.velocity.x > 0) {
    ball.position.x = w - 100;
  }
  if (ball.position.x < 0 && ball.velocity.x < 0) {
    ball.position.x = 0;
  }
  if (ball.position.y > (h - 100) && ball.velocity.y > 0) {
    ball.position.y = h - 100;
  }
  if (ball.position.y < 0 && ball.velocity.y < 0) {
    ball.position.y = 0;
  }
  ball.style.top = ball.position.y + "px"
  ball.style.left = ball.position.x + "px"
  requestAnimationFrame(update);//KEEP ANIMATING
};
/** detecte si la ball passe au dessus d'une reponse **/
function isHover(e) {
var reponse = document.querySelector('.reponse1');
return (document.querySelector('.reponse1:hover') === e);
}
var myDiv = document.getElementById('ball');;
document.addEventListener('mousemove', function checkHover() {
var hovered = isHover(myDiv);
if (hovered !== checkHover.hovered) {
console.log(hovered ? 'hovered' : 'not hovered');
checkHover.hovered = hovered;
}
});

/********** ACTIVATION PAGE 2 *********/
button2.onclick = function () {
  socket.emit("change_page2");
}
socket.on("change_page2", function () {
  pageTest2.style.display = "block";
  pageTest1.style.display = "none";
  pageTest3.style.display = "none";
  title1.style.display = "none";
});

/*************************************/
/************** TEST 3 **************/
/***********************************/
    // Listen to file input events
    document.getElementById("input").addEventListener("change", function (event) {
  // Prepeare file reader
  var file = event.target.files[0];
  var fileReader = new FileReader();
  fileReader.onloadend = function (event) {
    // Send an image event to the socket
    var image = event.target.result
    //output.src = image;
    socket.emit("image", image);
  };
  // Read file
  fileReader.readAsDataURL(file);
})
socket.on("image", function (image) {
  //output.src = image;
});
/********** ACTIVATION PAGE 3 *********/
  button3.onclick = function () {
  socket.emit("change_page3");
}
socket.on("change_page3", function () {
  pageTest3.style.display = "block";
  pageTest2.style.display = "none";
  pageTest1.style.display = "none";
  title1.style.display = "none";
});