let socket, sendMessageBoard;
$(() => {
  canPresent = false;
  socket = io.connect("http://localhost:5500");
  sendMessageBoard = new DrawingBoard.Board("sendMessageBoard");
  /*
  $("#sendDWGbtn").click(() => {
    // Send image to server on button click
    console.log("SEND DRAWINGG");
    socket.emit("drawing", sendMessageBoard.getImg());
    //After sending image clears out the canvas
    //sendMessageBoard.resetBackground();
    return false;
  });*/

  $("#sendDWGbtn").click(() => {
    // Send image to server on button click
    console.log("present ", document.getElementById("name").value, canPresent);
    socket.emit("present", document.getElementById("name").value);
    //After sending image clears out the canvas
    //sendMessageBoard.resetBackground();
    return false;
  });

  setInterval(() => {
    console.log(canPresent);
    if (!canPresent) return;
    // Send image to server on button click
    //console.log("SEND DRAWINGG");
    socket.emit("drawing", sendMessageBoard.getImg());
    //After sending image clears out the canvas
    //sendMessageBoard.resetBackground();
    return false;
  }, 2000);

  socket.on("drawing", function (msg) {
    $("#messageContainer")
      .empty()
      .append(
        $("<li class='w-100 d-flex align-center justify-content-center'>").html(
          `<img src="${msg}" class="w-75 m-auto img-msg"/>`
        )
      );
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on("present", function (name) {
    console.log("name is ", name, document.getElementById("name").value);
    document.getElementById("name").value === name
      ? (canPresent = true)
      : (canPresent = false);
  });
});
