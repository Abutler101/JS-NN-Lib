console.log('OBJECTIVE - learn OR gate');
var inputs = 2;
var hidden = 10;
var outputs = 1;
var nn = new NeuralNetwork(inputs,hidden,outputs);
var inputs = [
                [1,0.01],
                [0.01,1],
                [0.01,0.01],
                [1,1]
              ]

var targets = [
                [1],
                [1],
                [0.01],
                [1]
              ]

for(var epoch=1;epoch<=1000000;epoch++){
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
