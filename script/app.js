/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

// get the current date
var curday = function(sp) {
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return mm + sp + dd + sp + yyyy;
};
// console.log(curday('.'));

function populateDownloadLink({ downloadEl, asciiContainer }) {
  const ascii = asciiContainer.innerHTML;
  // const modifiedAscii = ascii // kill this line
  // custom message (\\ = \)
  const signature = `
                     .__.__  ___.                  __  .__     
_____    ______ ____ |__|__| \\_ |__   ____   _____/  |_|  |__  
\\__  \\  /  ___// ___\\|  |  |  | __ \\ /  _ \\ /  _ \\   __\\  |  \\ 
  / __ \\_\\___ \\\\  \\___|  |  |  | \\_\\ (  <_> |  <_> )  | |   Y  \\
(____  /____  >\\___  >__|__|  |___  /\\____/ \\____/|__| |___|  /
     \\/     \\/     \\/             \\/                        \\/ 

`;
  const byline1 = `zeke wattles                  when: `;
  const byline2 = `
graphic designer              where: artcenter grad show
zeke.studio
zeke@zeke.studio
323.854.6106`;
  const modifiedAscii = ascii + signature + byline1 + curday(".") + byline2;
  const file = new Blob([modifiedAscii], { type: "text/plain" }); // frame data
  downloadEl.href = URL.createObjectURL(file); // inject frame into download link
  downloadEl.download = "ascii.txt"; // set file name
}

(function() {
  const asciiContainer = document.getElementById("ascii");
  const downloadEl = document.getElementById("download");
  let cameraInitialized = false;

  camera.init({
    width: 84,
    height: 62,
    fps: 30,
    mirror: true,

    onFrame: function(canvas) {
      ascii.fromCanvas(canvas, {
        // contrast: 128,
        callback: function(asciiString) {
          asciiContainer.innerHTML = asciiString;
        }
      });
      populateDownloadLink({ downloadEl, asciiContainer });
    },

    onSuccess: function() {
      document.getElementById("info").style.display = "none";

      const cameraDelay = 3000 // 3 seconds
      const cameraControl = () => {
        button.blur()
        camera.pause();
        // this is a shitty way to do a few things
        // just the first time the button is clicked
        if (!cameraInitialized) {
          camera.start()
          button.innerText = "Take a picture"
        } else {
          downloadEl.click()
          setTimeout(camera.start, cameraDelay)
        }

        cameraInitialized = true
      }

      const button = document.getElementById("button");
      button.style.display = "block";
      button.onclick = cameraControl

      // only on space
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') cameraControl()
      });

      // any key
      // document.addEventListener('keydown', cameraControl)
    },

    onError: function(error) {
      // TODO: log error
    },

    onNotSupported: function() {
      document.getElementById("info").style.display = "none";
      asciiContainer.style.display = "none";
      document.getElementById("notSupported").style.display = "block";
    }
  });
})();
