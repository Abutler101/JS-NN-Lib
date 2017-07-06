
NeuralNetwork.sigmoid = function(x){
  var res=1/(1+Math.pow(Math.E, -x));
  return res;
}

NeuralNetwork.derSigmoid = function(x){
  return x*(1-x);
}

function NeuralNetwork(){


}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){


}

NeuralNetwork.prototype.query = function(inputsArray){


}
