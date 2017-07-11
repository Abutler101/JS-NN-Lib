
//NN.js contents

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
  //weights: [inputToFirstHidden,firstToSecondHidden,...,finalHiddenToOutput]
  for(var i=0;i<nodeDistribution.length-1;i++){
    this.weights[i] = new Matrix(nodeDistribution[i+1],nodeDistribution[i]);
    this.weights[i].randomise();
//    console.table(this.weights[i].matrix)
  }
}

NeuralNetwork.prototype.train = function(inputsArray,targetsArray){
  var inputs = Matrix.convFromArray(inputsArray);
  var targets = Matrix.convFromArray(targetsArray);
  var outOfLayers = [];
  //outOfLayers: [fistHiddenOutput,secondHiddenOutput,OutputOfOutput]
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
  //errors: [0] ->error on output layer
  //        [1] ->error on last Hidden layer
  //        ....
  //        [50] ->error on first Hidden layer
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
  //Gradients:      [0] -> gradient for output
  //                [1] -> gradient for last hidden layer
  //                ...
  //                [5] -> gradient for first hidden layer
  for(var i =0;i<outOfLayers.length;i++){
    this.Gradients[i]=Matrix.map(outOfLayers[outOfLayers.length-1-i],NeuralNetwork.derSigmoid);
    this.Gradients[i].multiply(errors[i]);
    this.Gradients[i].multiply(this.learningRate);
  }

//End Gradient descent
//Start weight changeing
  this.weightChanges = [];
  //weightChanges: [0] ->change on last hidden to output
  //               [1] -> change on penultimate hidden to last hidden layer
  //               ...
  //               [5] ->change on input to first hidden
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
  //outOfLayers: [fistHiddenOutput,secondHiddenOutput,...,lastHiddenOutput,OutputOfOutput]
  for(var i=0;i<this.weights.length;i++){
    if(i===0){var outOfPrev = inputs;}
    else{var outOfPrev = outOfLayers[i-1];}
    inputToHidden = Matrix.dot(this.weights[i],outOfPrev);
    outOfLayers[i] = Matrix.map(inputToHidden,NeuralNetwork.sigmoid);
  }
  return outOfLayers[outOfLayers.length-1].convToArray();
}

// Matrix file contents

//var matrix = new Matrix(3,2)
//console.table(matrix.matrix)
//
function Matrix(rows,cols){
  this.rows=rows;
  this.cols=cols;
  this.matrix= new Array(rows);
  for(var i =0; i<this.rows; i++){
    this.matrix[i] = new Array(cols);
    for(var j=0;j<this.cols;j++){
      this.matrix[i][j] = 0;
    }
  }
}

//Seems to work
Matrix.prototype.randomise = function(){
  for(var i=0; i< this.rows; i++){
    for(var j=0; j<this.cols; j++){
      this.matrix[i][j] = Math.floor(Math.random() * 10)
    }
  }
}

//Seems to work
Matrix.prototype.convToArray = function(){
  var array = [];
  for(var i = 0;i<this.rows;i++){
    for(var j = 0;j<this.cols;j++){
      array.push(this.matrix[i][j]);
    }
  }
  return array;
}

//Not sure if it works
Matrix.prototype.transpose = function(){
  var out = new Matrix(this.cols,this.rows);
  for(var i = 0;i<out.rows;i++){
    for(var j = 0;j<out.cols;j++){
      out.matrix[i][j] = this.matrix[j][i];
    }
  }
  return out;
}

//Seems to work
Matrix.prototype.copy = function(){
  var out = new Matrix(this.rows, this.cols);
  for(var i = 0;i<this.rows;i++){
    for(var j = 0;j<this.cols;j++){
      out.matrix[i][j]= this.matrix[i][j];
    }
  }
  return out;
}

//Seems to work
Matrix.prototype.multiply = function (n) {
  if(n instanceof Matrix){
    for(var i=0; i< this.rows; i++){
      for(var j=0; j<this.cols; j++){
        this.matrix[i][j] *= n.matrix[i][j];
      }
    }
  }
  else{
    for(var i=0; i< this.rows; i++){
      for(var j=0; j<this.cols; j++){
        this.matrix[i][j] *= n;
      }
    }
  }
}

//Seems to work
Matrix.prototype.add = function (n) {
  if(n instanceof Matrix){
    for(var i=0; i< this.rows; i++){
      for(var j=0; j<this.cols; j++){
        this.matrix[i][j] += n.matrix[i][j];
      }
    }
  }
  else{
    for(var i=0; i< this.rows; i++){
      for(var j=0; j<this.cols; j++){
        this.matrix[i][j] += n;
      }
    }
  }
}

//Not sure if it works
Matrix.map = function(m,func){
//  console.log(func);
  var out = new Matrix(m.rows,m.cols);
  for(var i = 0;i<out.rows;i++){
    for(var j = 0;j<out.cols;j++){
      out.matrix[i][j] = func(m.matrix[i][j])
    }
  }
  return out;
}

//Seems to work
Matrix.subtract = function(m1,m2){
  var out = new Matrix(m1.rows,m1.cols);
  for(var i = 0;i<out.rows;i++){
    for(var j = 0;j<out.cols;j++){
      out.matrix[i][j] = m1.matrix[i][j] - m2.matrix[i][j];
    }
  }
  return out;
}

//Seems to work
Matrix.dot = function(m1,m2){
  if(m1.cols != m2.rows){
    console.log("matricies are incompatible")
    return;
  }
  var out = new Matrix(m1.rows,m2.cols);
  for(var i = 0;i<m1.rows;i++){
    for(var j= 0;j<m2.cols;j++){
      var total = 0;
      for(var k =0;k<m1.cols;k++){
        total+= m1.matrix[i][k] * m2.matrix[k][j];
      }
      out.matrix[i][j] = total;
    }
  }
  return out;
}

//Seems to not be working
Matrix.convFromArray = function(array){
  var m = new Matrix(array.length, 1);
  for (var i = 0; i < array.length; i++) {
    m.matrix[i][0] = array[i];
  }
  return m;
}

//TEST contents

console.log('OBJECTIVE - learn AND gate');
var nodeDistribution = [2,5,3,4,1]
var nn = new NeuralNetwork(nodeDistribution);
var acc = 0;
var inputs = [
                [1,0.01],
                [0.01,1],
                [0.01,0.01],
                [1,1]
              ]

var targets = [
                [0.01],
                [0.01],
                [0.01],
                [1]
              ]

function RndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

for(var epoch=1;epoch<=10000000;epoch++){//    10 mill iterations
  if(epoch% 2 === 0){
    var index = RndInt(0,3)
    var test = nn.query(inputs[index])
    if(test < 0.5 && targets[index] < 0.5 || test >= 0.5 && targets[index]>= 0.5){
      acc ++;
    }
  }
  if(epoch % 200000 ===0){  //every 200 thousand
    console.log('Epoch: '+epoch+' Time elapsed: '+' coming soon '+' Accuracy: '+((acc/ 200000)*100)+'%')
    acc = 0;
  }
  for(var Tcase = 0;Tcase<inputs.length;Tcase++){
      nn.train(inputs[Tcase],targets[Tcase]);
  }
}

console.log('Training done')
temp = nn.query(inputs[0])
console.log(temp+"                SHOULD BE LOW")
temp = nn.query(inputs[1])
console.log(temp+"                SHOULD BE LOW")
temp = nn.query(inputs[2])
console.log(temp+"                SHOULD BE LOW")
temp = nn.query(inputs[3])
console.log(temp+"                SHOULD BE HIGH")
