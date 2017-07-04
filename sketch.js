console.log('OBJECTIVE - learn AND gate');
var inputs = 2;
var hidden = 10;
var outputs = 1;
var nn = new NeuralNetwork(inputs,hidden,outputs);

var inputCase1 = [1,0.01]
var targeCase1 = [0.01]

var inputCase2 = [0.01,1]
var targeCase2 = [0.01]

var inputCase3 = [0.01,0.01]
var targeCase3 = [0.01]

var inputCase4 = [1,1]
var targeCase4 = [1]

<<<<<<< HEAD
for(var i=0;i<1000;i++){
=======
for(var i=0;i<500000;i++){
>>>>>>> b19dbc795d3c0e926a1e9cdb11b304d3067d34fa
  nn.train(inputCase1,targeCase1);
  nn.train(inputCase2,targeCase2);
  nn.train(inputCase3,targeCase3);
  nn.train(inputCase4,targeCase4);
}
<<<<<<< HEAD
=======
console.log('Training done')
temp = nn.query(inputCase1);
console.log(temp+'			SHOULD BE LOW')

temp = nn.query(inputCase2);
console.log(temp+'			SHOULD BE LOW')

temp = nn.query(inputCase3);
console.log(temp+'			SHOULD BE LOW')

temp = nn.query(inputCase4);
console.log(temp+'			SHOULD BE HIGH')
>>>>>>> b19dbc795d3c0e926a1e9cdb11b304d3067d34fa
