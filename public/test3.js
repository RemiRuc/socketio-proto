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