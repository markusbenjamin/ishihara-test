var plate, plateImages, responses, truth;
var nextButton, responseInput;
var buttonPos, buttonSize;
var inputPos, inputSize;
var fontSizes;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  noFill();
  noStroke();

  plate = 0;
  plateImages = [];
  for (var i = 1; i < 18; i++) {
    plateImages.push(loadImage('plates2/Plate' + i + '.gif'));
  }
  responses = [];
  truth = ['12', '8', '29', '5', '3', '15', '74', '6', '45', '5', '7', '16', '73', 'nothing', 'nothing', '26', '42'];
  redSpecificError = [null, '3', '70', '2', '5', '17', '21', 'n', 'n', 'n', 'n', 'n', 'n', '5', '45', '6', null];
  greenSpecificError = [null, '3', '70', '2', '5', '17', '21', 'n', 'n', 'n', 'n', 'n', 'n', '5', '45', null, '2'];
  totalSpecificError = ['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', null, null, null, null];

  nextButton = createButton('Next');
  nextButton.mousePressed(nextPlate);
  nextButton.show();

  responseInput = createInput();
  responseInput.hide();

  calculateSizes();
  setSizes();
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
  calculateSizes();
  setSizes();
}

function calculateSizes() {
  buttonPos = [
    width * 0.85,
    height * 0.85
  ];
  buttonSize = [
    width * 0.1,
    height * 0.05
  ];
  inputPos = [
    width * 0.5,
    height * 0.85
  ];
  inputSize = [
    width * 0.4,
    height * 0.05
  ];
  fontSizes = [
    width * 0.018,
    width * 0.022
  ];
}

function setSizes() {
  nextButton.position(buttonPos[0] - buttonSize[0] / 2, buttonPos[1]);
  styleElement(nextButton, buttonSize[0], buttonSize[1], fontSizes[1]);

  responseInput.position(inputPos[0] - inputSize[0] / 2, inputPos[1]);
  styleElement(responseInput, inputSize[0], inputSize[1], fontSizes[0]);
}

function draw() {
  background(1);
  if (plate == 0) {
    fill(0);
    textSize(fontSizes[0]);
    text('You are going to see colorful images that may or may not contain a number.\n\nYour taks is to write the number you see in the image into the box below it, if you see one.\nIf you cannot see a number clearly, write \'n\' in the box below.\n\nPress Next to start the test.', width * 0.5, height * 0.5);
    noFill();
  }
  else if (plate < plateImages.length) {
    responseInput.show();
    image(plateImages[plate - 1], width * 0.5, height * 0.5);
  }
  else {
    fill(0);
    textSize(fontSizes[0]);
    text('Test finished. Score:  ' + round(100 * getScore()) + '%', width * 0.5, height * 0.5);
    noFill();
  }
}

function nextPlate() {
  if (0 < plate && plate < 13) {
    responses.push(responseInput.value());
    responseInput.value('');
  }
  plate++;
  if (plate == 13) {
    nextButton.hide();
    responseInput.hide();
  }
}

function styleElement(element, w, h, fS) {
  element.style('width', w + 'px');
  element.style('height', h + 'px');
  element.style('font-family', 'Arial');
  element.style('font-size', fS + 'px');
}

function getScore() {
  var total = 0;
  for (var i = 0; i < 12; i++) {
    if (truth[i] == responses[i]) {
      total++
    }
  }
  return total / 12;
}