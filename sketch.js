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
    plateImages.push(loadImage('plates2/Plate' + i + '.jpg'));
  }
  responses = [];
  truth = ['12', '8', '29', '5', '3', '15', '74', '6', '45', '5', '7', '16', '73', 'n', 'n', '26', '42'];
  redGreenSpecificError = [null, '3', '70', '2', '5', '17', '21', 'n', 'n', 'n', 'n', 'n', 'n', '5', '45', null, null];
  redSpecificError = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '6', null];
  greenSpecificError = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2'];
  totalSpecificError = ['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', null, null, null, null];

  nextButton = createButton('Következő');
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
    width * 0.15,
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
    //text('You are going to see colorful images that may or may not contain a number.\n\nYour task is to write the number you see in the image into the box below it, if you see one.\nIf you cannot see a number clearly, write \'n\' in the box below.\n\nPress Next to start the test.', width * 0.5, height * 0.5);
    text('Különböző színes képeket fogsz látni, amelyek tartalmazhatnak számokat is.\n\nAz lesz a feladatod, hogy írd be a látott számot a kép alatti szövegdobozba.\nHa nem látsz semmilyen számot, vagy bizonytalan vagy, akkor írj egy n betűt a szövegdobozba.\n\nKattints a gombra a kezdéshez', width * 0.5, height * 0.5);
    noFill();
  }
  else if (plate < plateImages.length + 1) {
    responseInput.show();
    image(plateImages[plate - 1], width * 0.5, height * 0.5);
  }
  else {
    var errors = getErrors();
    fill(0);
    textSize(fontSizes[0]);
    text(
      'Vége a tesztnek. Összes hiba: ' + errors[0] +
      '\nVörös-zöld hibák: ' + errors[1] +
      '\nVörös hibák: ' + errors[2] +
      '\nZöld hibák: ' + errors[3] +
      '\nAbszolút színtévesztő hibák: ' + errors[4] +
      '\nEgyéb hibák: ' + errors[5],
      width * 0.5, height * 0.5
    );
    noFill();
  }
}

function nextPlate() {
  if (plate == 0 || responseInput.value() != '') {
    if (0 < plate && plate < plateImages.length + 1) {
      responses.push(responseInput.value());
      responseInput.value('');
    }
    plate++;
    if (plate == plateImages.length + 1) {
      nextButton.hide();
      responseInput.hide();
    }
  }
}

function styleElement(element, w, h, fS) {
  element.style('width', w + 'px');
  element.style('height', h + 'px');
  element.style('font-family', 'Arial');
  element.style('font-size', fS + 'px');
}

function getErrors() {
  var truthTotal = 0;
  var redGreenSpecificTotal = 0;
  var redSpecificTotal = 0;
  var greenSpecificTotal = 0;
  var totalSpecificTotal = 0;
  var elseTotal = 0;
  for (var i = 0; i < plateImages.length; i++) {
    if (responses[i] == truth[i]) {
      truthTotal++;
    }
    else if (responses[i] == redGreenSpecificError[i]) {
      redGreenSpecificTotal++;
    }
    else if (responses[i] == redSpecificError[i]) {
      redSpecificTotal++;
    }
    else if (responses[i] == greenSpecificError[i]) {
      greenSpecificTotal++;
    }
    else if (responses[i] == totalSpecificError[i]) {
      totalSpecificTotal++;
    }
    else {
      elseTotal++;
    }
  }
  return [truthTotal, redGreenSpecificTotal, redSpecificTotal, greenSpecificTotal, totalSpecificTotal, elseTotal];
}