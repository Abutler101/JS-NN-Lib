NeuralNetwork.sigmoid = function(x){
  var res=1/(1+pow(Math.E, -x));
  return res;
}

NeuralNetwork.derSigmoid = function(x){
  return x*(1-x);
}

function NeuralNetwork(noI,noH,noO,lr,act){
  this.inputNodes = noI;
  this.hiddenNodes = noH;
  this.outputNodes = noO;
  this.learnRa = lr || 0.1;
// only 3 layers - I->H->O
  this.weightsInputToHidden = new Matrix(this.hiddenNodes,this.inputNodes);
  this.weightsHiddenToOutput = new Matrix(this.outputNodes,this.hiddenNodes);
  this.weightsInputToHidden.randomise();
  this.weightsHiddenToOutput.randomise();
  if(act == "sig"){
    this.activationFunc = NeuralNetwork.sigmoid;
    this.derivationFunc = NeuralNetwork.derSigmoid;
  }
}
NeuralNetwork.prototype.train = function(inputsArray,targetsArray){
//feed-forward
  var inputs = Matrix.convFromArray(inputsArray);
  var targets = Matrix.convFromArray(targetsArray);
  var inputToHidden = Matrix.dot(this.weightsInputToHidden,inputs);
  var outOfHidden = Matrix.map(inputToHidden,this.activationFunc);
  var inputToOutput = Matrix.dot(this.weightsHiddenToOutput,outOfHidden);
  var outOfOutput = Matrix.map(inputToOutput,this.activationFunc);
//feed-backward
  var errorsOnOutput = Matrix.subtract(targets,outputs);
  var weightsHiddenToOutputTrans = this.weightsHiddenToOutput.transpose();
  var errorsOnHidden = Matrix.dot(weightsHiddenToOutputTrans, errorsOnOutput);
  
}
