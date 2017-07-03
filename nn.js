var targetsglob;
var outOfOutputglob;
NeuralNetwork.sigmoid = function(x){
  var res=1/(1+Math.pow(Math.E, -x));
  return res;
}

NeuralNetwork.derSigmoid = function(x){
  return x*(1-x);
}

function NeuralNetwork(noI,noH,noO,lr){
  this.inputNodes = noI;
  this.hiddenNodes = noH;
  this.outputNodes = noO;
  this.learnRa = lr || 0.1;
// only 3 layers - I->H->O
  this.weightsInputToHidden = new Matrix(this.hiddenNodes,this.inputNodes);
  this.weightsHiddenToOutput = new Matrix(this.outputNodes,this.hiddenNodes);
  this.weightsInputToHidden.randomise();
  this.weightsHiddenToOutput.randomise();
}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){
//feed forward
  console.log('entered training');
  var inputs = Matrix.convFromArray(inputsArray);
  var targets = Matrix.convFromArray(targetsArray);
  console.log('converted inputs & targets to matrix');
  var inputToHidden = Matrix.dot(this.weightsInputToHidden,inputs);
  var outOfHidden = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  var inputToOutput = Matrix.dot(this.weightsHiddenToOutput,outOfHidden);
  var outOfOutput = Matrix.map(inputToOutput,NeuralNetwork.sigmoid);
  console.log('finished forward feed');
//back prop
  console.log('start back prop');
  var errorsOnOutput = Matrix.subtract(targets,outOfOutput); //issue is now here
  console.log('subtract');
  var weightsHiddenToOutputTrans = this.weightsHiddenToOutput.transpose();
  console.log('transpose');
  var errorsOnHidden = Matrix.dot(weightsHiddenToOutputTrans, errorsOnOutput);
  console.log('end back prop');
//Gradient slide
  var gradientOutput = Matrix.map(outOfOutput,NeuralNetwork.derSigmoid);
  gradientOutput.multiply(errorsOnOutput);
  gradientOutput.multiply(this.learnRa);
  var gradientHidden = Matrix.map(outOfHidden,NeuralNetwork.derSigmoid);
  gradientHidden.multiply(errorsOnHidden);
  gradientHidden.multiply(this.learnRa);
//Change weights of hidden to outpput feed
  var outOfHiddenTrans = outOfHidden.transpose();
  var changeInHiddenToOutputWeights = Matrix.dot(gradientOutput,outOfHiddenTrans);
  this.weightsHiddenToOutput.add(changeInHiddenToOutputWeights);
//Change weights of input to hidden feed
  var inputsTrans = inputs.transpose();
  var changeInInputToHiddenWeights = Matrix.dot(gradientHidden,inputsTrans);
  this.weightsInputToHidden.add(changeInInputToHiddenWeights);
}

//How to feed data to get actual results
NeuralNetwork.prototype.query = function(inputsArray){
  var inputs = Matrix.convFromArray(inputsArray);
  var inputToHidden = Matrix.dot(this.weightsInputToHidden,inputs);
  var outOfHidden = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  var inputToOutput = Matrix.dot(this.weightsHiddenToOutput,outOfHidden);
  var outOfOutput = Matrix.map(inputToOutput,NeuralNetwork.sigmoid);
  return outOfOutput.convToArray;
}
