console.log('OBJECTIVE - learn AND gate');
var inputs = 2;
var hidden = 5;
var outputs = 1;
var nn = new NeuralNetwork(inputs,hidden,outputs);

var inputCase1 = [1,0]
var targeCase1 = [0]

var inputCase2 = [0,1]
var targeCase2 = [0]

var inputCase3 = [0,0]
var targeCase3 = [0]

var inputCase4 = [1,1]
var targeCase4 = [1]

for(var i=0;i<1000;i++){
  nn.train(inputCase1,targeCase1);
  nn.train(inputCase2,targeCase2);
  nn.train(inputCase3,targeCase3);
  nn.train(inputCase4,targeCase4);
}
