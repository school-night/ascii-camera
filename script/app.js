/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

function populateDownloadLink ({ downloadEl, asciiContainer }) {
	const ascii = asciiContainer.innerHTML
	const modifiedAscii = ascii // kill this line
	// const modifiedAscii = ascii + "\nur in zeke's world now" // custom message (\n is new line)
	const file = new Blob([modifiedAscii], {type: 'text/plain'}) // frame data
	downloadEl.href = URL.createObjectURL(file) // inject frame into download link
	downloadEl.download = 'ascii.txt' // set file name
}

(function() {
	const asciiContainer = document.getElementById("ascii");
	const downloadEl = document.getElementById('download')
	let capturing = false;

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
			populateDownloadLink({ downloadEl, asciiContainer })
		},

		onSuccess: function() {
			document.getElementById("info").style.display = "none";

			const button = document.getElementById("button");
			button.style.display = "block";
			button.onclick = function() {
				if (capturing) {
					camera.pause();
					downloadEl.click()
					button.innerText = 'start';
				} else {
					camera.start();
					button.innerText = 'capture';
				}
				capturing = !capturing;
			};
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

