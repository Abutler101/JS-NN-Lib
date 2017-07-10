//var temp = new NeuralNetwork([2,3,4,1])
console.log('OBJECTIVE - learn AND gate');
var nodeDistribution = [2,5,3,4,1]
var nn = new NeuralNetwork(nodeDistribution);
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

for(var epoch=1;epoch<=50000000;epoch++){
  if(epoch % 200000 ===0){
    console.log('epoch: '+epoch)
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
