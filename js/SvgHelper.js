function loadSVGPlusReset(svgString) {
  allRemove();
  fabric.loadSVGFromString(svgString, function (objects, options) {
    var canvasUsableHeight = canvas.height - svgPagging;
    var overallScaleX = canvas.width / options.width;
    var overallScaleY = canvasUsableHeight / options.height;
    var scaleToFit = Math.min(overallScaleX, overallScaleY);
    var offsetX = (canvas.width - options.width * scaleToFit) / 2;
    var offsetY = (svgPagging / 2) + (canvasUsableHeight - options.height * scaleToFit) / 2;

    clipAreaCoords.left = offsetX;
    clipAreaCoords.top = offsetY;
    clipAreaCoords.width = options.width * scaleToFit;
    clipAreaCoords.height = options.height * scaleToFit;
    canvas.backgroundColor = 'white';

    objects.forEach(function (obj) {
      obj.scaleX = scaleToFit;
      obj.scaleY = scaleToFit;
      obj.top = obj.top * scaleToFit + offsetY;
      obj.left = obj.left * scaleToFit + offsetX;
      obj.setCoords();

      obj.selectable = false;
      obj.hasControls = false;
      obj.lockMovementX = true;
      obj.lockMovementY = true;
      obj.lockRotation = true;
      obj.lockScalingX = true;
      obj.lockScalingY = true;
      obj.excludeFromLayerPanel = true;
      canvas.add(obj);
    });

    canvas.renderAll();
    saveState();
  });
};

function loadSVGReadOnly(svgString) {
  fabric.loadSVGFromString(svgString, function (objects, options) {
    var canvasUsableHeight = canvas.height - svgPagging;
    var overallScaleX = canvas.width / options.width;
    var overallScaleY = canvasUsableHeight / options.height;
    var scaleToFit = Math.min(overallScaleX, overallScaleY);
    var offsetX = (canvas.width - options.width * scaleToFit) / 2;
    var offsetY = (svgPagging / 2) + (canvasUsableHeight - options.height * scaleToFit) / 2;

    clipAreaCoords.left = offsetX;
    clipAreaCoords.top = offsetY;
    clipAreaCoords.width = options.width * scaleToFit;
    clipAreaCoords.height = options.height * scaleToFit;
    canvas.backgroundColor = 'white';


    
    // Apply the scaling and positioning to each object
    var scaledObjects = objects.map(function (obj) {
      obj.scaleX = scaleToFit;
      obj.scaleY = scaleToFit;
      obj.top = obj.top * scaleToFit + offsetY;
      obj.left = obj.left * scaleToFit + offsetX;
      return obj;
    });

    // Create a group from the scaled objects
    var group = new fabric.Group(scaledObjects, {
      left: offsetX,
      top: offsetY,
      selectable: true,
      hasControls: true,
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,
    });

    canvas.add(group);
    canvas.renderAll();
    saveState();
    updateLayerPanel()
  });
};


const previewArea = document.getElementById("svg-preview-area");
const speechBubbleArea = document.getElementById("speech-bubble-area1");

window.onload = function() {

  previewArea.innerHTML = "";
  MangaPanelsImage.forEach(item => {
    const img = document.createElement("img");
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(item.svg);
    img.classList.add("svg-preview");
    img.alt = item.name;
    img.addEventListener("click", function() {
      loadSVGPlusReset(item.svg);
    });
    previewArea.appendChild(img);
  });


  speechBubbleArea.innerHTML = "";
  SpeechBubble.forEach(item => {
    const img = document.createElement("img");
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(item.svg);
    img.classList.add("svg-preview");
    img.alt = item.name;
    img.addEventListener("click", function() {
      loadSVGReadOnly(item.svg);
    });
    speechBubbleArea.appendChild(img);
  });
};



document.addEventListener('DOMContentLoaded', function() {
  var svgPreviewArea = document.getElementById('svg-preview-area');
  svgPreviewArea.addEventListener('mousedown', function(event) {
      event.preventDefault();
      event.stopPropagation();
  }, false);
});


document.addEventListener('DOMContentLoaded', function() {
  var svgPreviewArea = document.getElementById('speech-bubble-area1');
  svgPreviewArea.addEventListener('mousedown', function(event) {
      event.preventDefault();
      event.stopPropagation();
  }, false);
});