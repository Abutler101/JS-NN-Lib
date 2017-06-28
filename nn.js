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
  this.activationFunc = act;
  this.lr = lr;


}
