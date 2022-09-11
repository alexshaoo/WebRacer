var isResizing = false,
  lastDownX = 0;

$(function () {
  var container = $("#container"),
    left = $("#questionOutput"),
    right = $("#code"),
    handle = $("#dragH");

  handle.on("mousedown", function (e) {
    isResizing = true;
    lastDownX = e.clientX;
  });

  $(document)
    .on("mousemove", function (e) {
      // we don't want to do anything if we aren't resizing.
      if (!isResizing) return;
      //making sure the mouse isnt out of bounds
      if (e.clientX < 10) return;
      if (e.clientX > screen.width - 10) return;
      var offsetRight =
        container.width() - (e.clientX - container.offset().left);

      left.css("right", offsetRight);
      right.css("width", offsetRight);
    })
    .on("mouseup", function (e) {
      // stop resizing
      isResizing = false;
    });
});

var isResizingV = false,
  lastDownY = 0;

$(function () {
  var container = $("#questionOutput"),
    left = $("#question"),
    right = $("#output"),
    handle = $("#dragV");

  handle.on("mousedown", function (e) {
    isResizingV = true;
    lastDownY = e.clientY;
  });

  $(document)
    .on("mousemove", function (e) {
      // we don't want to do anything if we aren't resizing.
      if (!isResizingV) return;

      var offsetUp = container.height() - (e.clientY - container.offset().left);

      left.css("bottom", offsetUp);
      right.css("height", offsetUp);
    })
    .on("mouseup", function (e) {
      // stop resizing
      isResizingV = false;
    });
});

//js for the tabs
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

//making sure new divs arent made every time enter is
$("div[contenteditable]").keydown(function (e) {
  // trap the return key being pressed
  if (e.key === 'Enter') {
    document.execCommand('insertLineBreak')
    e.preventDefault()
  }
});

function run(){
  let htmlCode = document.getElementById("HTML").innerText;
  let cssCode = '<style>' + document.getElementById("CSS").innerText + '</style>';
  let jsCode = document.getElementById("JS").innerText;
  let output = document.getElementById("output-iframe");
  console.log(htmlCode, cssCode, jsCode);
  output.contentDocument.body.innerHTML = htmlCode + cssCode;
  output.contentWindow.eval(jsCode);
}