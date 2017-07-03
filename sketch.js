var nn;
var training;
var testing;
var trainingIndex = 0;
var testingIndex = 0;
var epochs = 0;
var input_nodes = 784;
var hidden_nodes = 256;
var output_nodes = 10;
var learning_rate = 0.1;
var totalCorrect = 0;
var totalGuesses = 0;
var statusP ='';
// DATAFrom: https://pjreddie.com/projects/mnist-in-csv/
console.log('launched');
function preload() {
  training = loadStrings('data/mnist_train_10000.csv');
  testing = loadStrings('data/mnist_test_1000.csv');
}

function setup() {
  console.log('entered setup');
  createCanvas(320, 280);
  nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate)
  console.log('created netwok');
  var saveButton = createButton('save model');
  saveButton.mousePressed(saveModelJSON);
  function saveModelJSON() {
    saveJSON(nn, 'model.json');
  }
  console.log('ending setup')
}

function draw() {
  console.log('frame:',frameCount);
  background(200);
  var traindata = train();
  var result = test();
  var testdata = result[0];
  var guess = result[1];
  var correct = result[2];
  if (correct) {
    totalCorrect++;
  }
  totalGuesses++;
  var status = 'performance: ' + nf(totalCorrect / totalGuesses, 0, 2);
  status += '<br>';
  var percent = 100 * trainingIndex / training.length;
  status += 'epochs: ' + epochs + ' (' + nf(percent, 1, 2) + '%)';
  statusP.html(status);
  console.log(status);
}

function train() {
  console.log('training');
  var values = training[trainingIndex].split(',');
  var inputs = [];
  for (var i = 1; i < values.length; i++) {
    inputs[i - 1] = map(Number(values[i]), 0, 255, 0, 0.99) + 0.01;
  }
  console.log('sanitised input');
  targets = [];
  for (var k = 0; k < output_nodes; k++) {
    targets[k] = 0.01;
  }
  console.log('sanitised targets');
  var label = Number(values[0]);
  targets[label] = 0.99;
  console.log('feeding values to net');
  nn.train(inputs, targets); // hangs here --> does not seem to actually run this command
  console.log('trained on inputs:',inputs);
  trainingIndex++;
  if (trainingIndex == training.length) {
    trainingIndex = 0;
    epochs++;
  }
  return inputs;
}

function test() {
  var values = training[testingIndex].split(',');
  var inputs = [];
  for (var i = 1; i < values.length; i++) {
    inputs[i - 1] = map(Number(values[i]), 0, 255, 0, 0.99) + 0.01;
  }
  var label = Number(values[0]);
  var outputs = nn.query(inputs);
  var guess = findMax(outputs);
  var correct = false;
  if (guess == label) {
    correct = true;
  }
  if (frameCount % 30 == 0) {
    testingIndex++;
    if (testingIndex == testing.length) {
      testingIndex = 0;
    }
  }
  return [inputs, guess, correct];

}

function findMax(list) {
  var record = 0;
  var index = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i] > record) {
      record = list[i];
      index = i;
    }
  }
  return index;
}
