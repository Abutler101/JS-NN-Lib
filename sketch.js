//var temp = new NeuralNetwork([2,3,4,1])
const NeuralNetwork = require('./core/nn');
const Matrix = require('./core/matrix');

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
    console.log('Epoch: '+epoch+' Time elapsed: '+' coming soon '+' Accuracy: '+((acc/ 20000)*100)+'%')
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
