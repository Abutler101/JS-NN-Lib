
NeuralNetwork.sigmoid = function(x){
  var res=1/(1+Math.pow(Math.E, -x));
  return res;
}

NeuralNetwork.derSigmoid = function(x){
  return x*(1-x);
}

function NeuralNetwork(nodeDistribution,learningRate){
  this.nodeDistribution = nodeDistribution;
  this.learningRate = learningRate || 0.1;
  this.weights = [];
  for(var i=0;i<nodeDistribution.length-1;i++){
    this.weights[i] = new Matrix(nodeDistribution[i+1],nodeDistribution[i]);
    this.weights[i].randomise();
  }
}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){
  var inputs = Matrix.convFromArray(inputsArray);
  var targets = Matrix.convFromArray(targetsArray);
  var outOfLayers = [];
//Start Feed forward
  for(var i=0;i<this.weights.length;i++){
    if(i===0){var outOfPrev = inputs;}
    else{var outOfPrev = outOfLayers[i-1];}
    inputToHidden = Matrix.dot(this.weights[i],outOfPrev)
    outOfLayers[i] = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  }
//End Feed forward
//Start BackProp
  var errors = [];
  errors[0] = Matrix.subtract(targets,outOfLayers[outOfLayers.length-1]);
  this.weightsReversed = this.weights.reverse();
  this.transposedWeights = [];
  for(var i = 0;i<this.weights.length;i++){
    this.transposedWeights[i] = this.weightsReversed[i].transpose();
  }
  for(var i = 1;i<outOfLayers.length;i++){
    errors[i] = Matrix.dot(this.transposedWeights[i-1],errors[i-1]);
  }
//End Backprop
//Start Gradient descent
  this.Gradients = []
  for(var i =0;i<outOfLayers.length;i++){
    this.Gradients[i]=Matrix.map(outOfLayers[outOfLayers.length-1-i],NeuralNetwork.derSigmoid);
    this.Gradients[i].multiply(errors[i]);
    this.Gradients[i].multiply(this.learningRate);
  }
//End Gradient descent
//Start weight changeing
  this.weightChanges = [];
  for(var i=0;i<this.weights.length;i++){
    if(i!=this.weights.length-1){
      this.weightChanges[i] = Matrix.dot(this.Gradients[i],(outOfLayers[outOfLayers.length-2-i].transpose()));
    }
    else{
      this.weightChanges[i] = Matrix.dot(this.Gradients[i],(inputs.transpose()));
    }
  }

  for(var i = 0; i<this.weightsReversed.length;i++){
    this.weightsReversed[i].add(this.weightChanges[i]);
  }
  this.weights = this.weightsReversed.reverse();
//End weight changeing
}

NeuralNetwork.prototype.query = function(inputsArray){
  var inputs = Matrix.convFromArray(inputsArray);
  var outOfLayers = [];
  for(var i=0;i<this.weights.length;i++){
    if(i===0){var outOfPrev = inputs;}
    else{var outOfPrev = outOfLayers[i-1];}
    inputToHidden = Matrix.dot(this.weights[i],outOfPrev);
    outOfLayers[i] = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  }
  return outOfLayers[outOfLayers.length-1].convToArray();
}
