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
          output.src = image;
          modif()
          socket.emit("image", image);
        };
        // Read file
        fileReader.readAsDataURL(file);
      })
      socket.on("image", function (image) {
        output.src = image;
        modif()
      });

      let blurElement = {a:100, b: 0, deg: 0}
      function modif(){
        output.style.opacity = 0
        output.style.filter = "grayscale(100px)"
        TweenMax.to(blurElement, 0.5, {a:0, b:1, onUpdate:applyBlur});

      //here you pass the filter to the DOM element
      function applyBlur()
      {
          TweenMax.set(output, {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)",opacity: blurElement.b});
          requestAnimationFrame(rotatatation)
      }

      function rotatatation(){
        requestAnimationFrame(rotatatation)
        blurElement.deg += 0.2
        if (blurElement.deg >=360) {
          blurElement.deg = -blurElement.deg
        }
        output.style.transform = "rotate3d(1, 1, 1, "+blurElement.deg+"deg)"
      }

      }

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