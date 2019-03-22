/********** RECUPERATION DES ELEMENTS **********/
var accueil = document.getElementById('accueil');
var pageConnexion = document.querySelector('.connexion-div-desktop');
var commencer = document.querySelector('.commencer');
var pageTest1 = document.getElementById('page-test1');
var pageTest2 = document.getElementById('page-test2');
var pageTest3 = document.getElementById('page-test3');
var button1 = document.getElementById('button_test1');
var button2 = document.getElementById('button_test2');
var button3 = document.getElementById('button_test3');
var title1 = document.querySelector('.title1');

var input = document.getElementById("input");
var output = document.getElementById("output");




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
var reponse;

function init() {
  ball = document.getElementById("ball");
  w = window.innerWidth;
  h = window.innerHeight;
  ball.style.left = (w / 2) + "px";
  ball.style.top = (h / 2) + "px";
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





/***********************************************/
/************** ACTIVATION PAGE 1 **************/
/***********************************************/
button1.onclick = function () {
  socket.emit("change_page1");
}
socket.on("change_page1", function () {
  pageTest1.style.display = "block";
  socket.on("animation", function(data){
    if (ball){
        ball.velocity.y = Math.round(-data.beta)/2;
        ball.velocity.x = Math.round(data.gamma)/2;
        // document.getElementById("doTiltLR").innerHTML = Math.round(data.beta);
        // document.getElementById("doTiltFB").innerHTML = Math.round(data.gamma);
        // document.getElementById("doDirection").innerHTML = Math.round(data.alpha);
        if (ball.position.x > reponse.left && ball.position.x < reponse.right && ball.position.y > reponse.top && ball.position.y < reponse.bottom){
          document.querySelector(".reponse1").style.backgroundColor = "rgba(0,0,0,0.2)";
        } else {
          document.querySelector(".reponse1").style.backgroundColor = "transparent";
        }
        if (ball.position.x > reponseDeux.left && ball.position.x < reponseDeux.right && ball.position.y > reponseDeux.top && ball.position.y < reponseDeux.bottom){
          document.querySelector(".reponse2").style.backgroundColor = "rgba(0,0,0,0.2)";
        } else {
          document.querySelector(".reponse2").style.backgroundColor = "transparent";
        }
      }
  });
  /** detecte si la ball passe au dessus d'une reponse **/
  reponse = document.querySelector(".reponse1").getBoundingClientRect();

  reponseDeux = document.querySelector(".reponse2").getBoundingClientRect();
  console.log(reponseDeux.top, reponseDeux.right, reponseDeux.bottom, reponseDeux.left);

  pageTest2.style.display = "none";
  pageTest3.style.display = "none";
  title1.style.display = "none";
});





/***********************************************/
/******************* TEST 2 ********************/
/***********************************************/
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





/***********************************************/
/************** ACTIVATION PAGE 2 **************/
/***********************************************/
button2.onclick = function () {
  socket.emit("change_page2");
}
socket.on("change_page2", function () {
  pageTest2.style.display = "block";
  pageTest1.style.display = "none";
  pageTest3.style.display = "none";
  title1.style.display = "none";
});