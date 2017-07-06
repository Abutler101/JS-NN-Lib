
NeuralNetwork.sigmoid = function(x){
  var res=1/(1+Math.pow(Math.E, -x));
  return res;
}

NeuralNetwork.derSigmoid = function(x){
  return x*(1-x);
}

function NeuralNetwork(nodeDistribution,learningRate){
  //nodeDistribution: [numInputNodes,numNodesHidden1,numNodesHidden2,...,numOutputNodes]
  this.nodeDistribution = nodeDistribution;
  this.learningRate = learningRate || 0.1;
  this.weights = [];
  for(var i=0;i<nodeDistribution.length-1;i++){
    this.weights[i] = new Matrix(nodeDistribution[i+1],nodeDistribution[i]);
    this.weights[i].randomise();
    console.table(this.weights[i].matrix)
  }
}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){


}

NeuralNetwork.prototype.query = function(inputsArray){


}
