(function() {
    let file
    
    const aEl = document.createElement('a')
    const aElText = document.createTextNode("Download ascii"); 
    aEl.appendChild(aElText)
})();

const getAscii = function() {
    const asciiEl = document.getElementById('ascii')
    return asciiEl.innerHTML
}

var download = function() {
    console.log('dload')
    // file = new Blob([asciiEl.innerHTML], {type: 'text/plain'})
    // aEl.href = URL.createObjectURL(file)
    // aEl.download = 'myfilename.txt'
    // document.querySelectorAll('body')[0].appendChild(aEl)
}