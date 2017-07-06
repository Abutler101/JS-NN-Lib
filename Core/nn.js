var targetsglob;
var outOfOutputglob;
NeuralNetwork.sigmoid = function(x){
  var res=1/(1+Math.pow(Math.E, -x));
  return res;
}

NeuralNetwork.derSigmoid = function(x){
  return x*(1-x);
}

function NeuralNetwork(noI,noO,noHNPL,lr){
  this.inputNodes = noI;                         //single intiger value
  this.outputNodes = noO;                       //single intiger value
  this.hiddenLayers = noHNPL.length;               //single intiger value
  this.nodeDistribution = noHNPL;       //list of intiger values, one per hidden layer
  this.weights = [];
  this.learnRa = lr || 0.1;

  //manually doing the input to first hidden
  this.weights[0]= new Matrix(this.nodeDistribution[0],this.inputNodes)
  this.weights[0].randomise();
  //Loop through all layers?
  for(var i = 1;i<this.nodeDistribution.length;i++){
    this.weights[i] = new Matrix(this.nodeDistribution[i],this.nodeDistribution[i-1]);
    this.weights[i].randomise();
  }
  //manually doing the last hidden to output
  this.weights[this.nodeDistribution.length] = new Matrix(this.outputNodes,this.nodeDistribution[this.nodeDistribution.length-1]);
  this.weights[this.nodeDistribution.length].randomise();
//  debugger;
}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){
//start feed forward
  var inputs = Matrix.convFromArray(inputsArray);
  var targets = Matrix.convFromArray(targetsArray);
  var outOfHiddens = [];
  //manually doing the input to first hidden
  var inputToHidden = Matrix.dot(this.weights[0],inputs)
  outOfHiddens[0] = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  //Loop through all layers?
  for(var i = 1;i<this.weights.length;i++){
    var inputToHidden = Matrix.dot(this.weights[i],outOfHiddens[i-1]);
    outOfHiddens[i] = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
    console.table(outOfHiddens[i].matrix)
  }
//  debugger; //Runs fine to here
  //manually doing the last hidden to output  -----> Seems to be an issue with this
  console.table(this.weights[this.weights.length-1].matrix)
  console.table(outOfHiddens[outOfHiddens.length-1].matrix)
  var inputToOutput = Matrix.dot(this.weights[this.weights.length-1],outOfHiddens[outOfHiddens.length-1]); //These are incompatible
  var outOfOutput = Matrix.map(inputToOutput,NeuralNetwork.sigmoid);
//end feed forward

//back prop
  var errorsOnOutput = Matrix.subtract(targets,outOfOutput);
  var weightsHiddenToOutputTrans = this.weightsHiddenToOutput.transpose();
  var errorsOnHidden = Matrix.dot(weightsHiddenToOutputTrans, errorsOnOutput);
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
  return outOfOutput.convToArray();
}
