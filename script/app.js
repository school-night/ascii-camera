/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

const getDate = (spacer) => {
  today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //As January is 0.
  let yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return `${mm}${spacer}${dd}${spacer}${yyyy}`;
};

// min and max included
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// generate more here: https://patorjk.com/software/taag/#p=testall&f=Graffiti&t=dublab
// escape special characters.
const logos = [
  `
    .___   ___.   .__        ___.
  __| _/_ _\\_ |__ |  | _____ \\_ |__
 / __ |  |  \\ __ \\|  | \\__  \\ | __ \\
/ /_/ |  |  / \\_\\ \\  |__/ __ \\| \\_\\ \\
\\____ |____/|___  /____(____  /___  /
     \\/         \\/          \\/    \\/
`,
  `
     _       _     _       _
    | |     | |   | |     | |
  __| |_   _| |__ | | __ _| |__
 / _\` | | | | '_ \\| |/ _\` | '_ \\
| (_| | |_| | |_) | | (_| | |_) |
 \\__,_|\\__,_|_.__/|_|\\__,_|_.__/
`,
  `
       __      __    __      __
  ____/ /_  __/ /_  / /___ _/ /_
 / __  / / / / __ \\/ / __ \`/ __ \\
/ /_/ / /_/ / /_/ / / /_/ / /_/ /
\\__,_/\\__,_/_.___/_/\\__,_/_.___/

`,
  `
      dP          dP       dP          dP
      88          88       88          88
.d888b88 dP    dP 88d888b. 88 .d8888b. 88d888b.
88'  \`88 88    88 88'  \`88 88 88'  \`88 88'  \`88
88.  .88 88.  .88 88.  .88 88 88.  .88 88.  .88
\`88888P8 \`88888P' 88Y8888' dP \`88888P8 88Y8888'
`,
];

const populateDownloadLink = ({ downloadEl, asciiContainer }) => {
  const ascii = asciiContainer.innerHTML;
  const logo = logos[getRandom(0, logos.length - 1)];
  const title = `SNAP FOUNDATION X DREAMHAUS\nYOUTH ADVISORY COUNCIL 2022`;
  const date = getDate(".");
  const credits = "@DUBLAB x @ZEKE.STUDIO x @ALITORBATI";

  const fileContents = [ascii, logo, title, date, credits].join("\n\n");
  const file = new Blob([fileContents], { type: "text/plain" }); // frame data
  downloadEl.href = URL.createObjectURL(file); // inject frame into download link
  downloadEl.download = `asciiBooth_${getDate("-")}_${Date.now()}.txt`; // set file name
};

(function () {
  const asciiContainer = document.getElementById("ascii");
  const downloadEl = document.getElementById("download");
  let cameraInitialized = false;

  camera.init({
    width: 84,
    height: 62,
    fps: 30,
    mirror: true,

    onFrame: function (canvas) {
      ascii.fromCanvas(canvas, {
        // contrast: 128,
        callback: function (asciiString) {
          asciiContainer.innerHTML = asciiString;
        },
      });
      populateDownloadLink({ downloadEl, asciiContainer });
    },

    onSuccess: function () {
      document.getElementById("info").style.display = "none";

      const cameraDelay = 3000; // 3 seconds
      const cameraControl = () => {
        button.blur();
        camera.pause();
        // this is a shitty way to do a few things
        // just the first time the button is clicked
        if (!cameraInitialized) {
          camera.start();
          button.innerText = "take a picture";
        } else {
          downloadEl.click();
          setTimeout(camera.start, cameraDelay);
        }

        cameraInitialized = true;
      };

      const button = document.getElementById("button");
      button.style.display = "block";
      button.onclick = cameraControl;

      // only on space
      document.addEventListener("keydown", (e) => {
        if (e.code === "Space") cameraControl();
      });

      // any key
      // document.addEventListener('keydown', cameraControl)
    },

    onError: function (error) {
      // TODO: log error
    },

    onNotSupported: function () {
      document.getElementById("info").style.display = "none";
      asciiContainer.style.display = "none";
      document.getElementById("notSupported").style.display = "block";
    },
  });
})();
