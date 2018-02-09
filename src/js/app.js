(function() {
  var progress = document.getElementsByClassName('progress');
  var progressArray = Array.prototype.slice.call(progress);
  progressArray.map(function(item) {
    var value = item.getAttribute('value');
    var dragbar = item.querySelector('.progress__dragbar');
    dragbar.style.left = value + '%';
  });
})();
(function() {
  var cv = document.querySelector('#cv');
  var menu = document.querySelector('#menu');
  menu.addEventListener('click', function () {
    var classes = cv.getAttribute('class');
    if(classes.indexOf('expended') !== -1) {
      cv.setAttribute('class', 'cv');
      menu.innerText = "→";
    } else {
      cv.setAttribute('class', 'cv expended');
      menu.innerText = "←";
    }
  })
})()