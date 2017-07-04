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

for(var epoch=1;epoch<=500000;epoch++){
  console.log('epoch: '+epoch)
  for(var case = 0;case<inputs.length;case++){
      nn.train(inputs[case],targets[case]);
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
