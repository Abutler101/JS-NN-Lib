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

  this.weights[0]= new Matrix(this.nodeDistribution[0],this.inputNodes)
  this.weights[0].randomise();
  console.table(this.weights[0].matrix)

  for(var i = 1;i<this.nodeDistribution.length;i++){
    this.weights[i] = new Matrix(this.nodeDistribution[i],this.nodeDistribution[i-1]);
    this.weights[i].randomise();
    console.table(this.weights[i].matrix)
  }
  
  this.weights[this.nodeDistribution.length] = new Matrix(this.outputNodes,this.nodeDistribution[this.nodeDistribution.length-1]);
  this.weights[this.nodeDistribution.length].randomise();
  console.table(this.weights[this.nodeDistribution.length].matrix)

  debugger;
}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){
//feed forward
  var inputs = Matrix.convFromArray(inputsArray);
  var targets = Matrix.convFromArray(targetsArray);
  var inputToHidden = Matrix.dot(this.weightsInputToHidden,inputs);
  var outOfHidden = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  var inputToOutput = Matrix.dot(this.weightsHiddenToOutput,outOfHidden);
  var outOfOutput = Matrix.map(inputToOutput,NeuralNetwork.sigmoid);
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
