//next term calculator
var numInputNods = 3;
var numHiddenNod = 20;
var numOutputNod = 20;
var network = new NeuralNetwork(numInputNods,numHiddenNod,numOutputNod,'sig');
var trainingDataInputs = [
                          [1,2,3],
                          [0,1,2],
                          [0,2,4],
                          [0,3,6],
                          [3,4,5]
                        ]

var trainingDataTargs = [
//                             Units value
//                         0,1,2,3,4,5,6,7,8,9]
//                        [0,0,0,0,0,0,0,0,0,0]
                          [0,0,0,0,0.9,0,0,0,0,0],//expected out 4
                          [0,0,0,0.9,0,0,0,0,0,0],//expected out 3
                          [0,0,0,0,0,0,0.9,0,0,0],//expected out 6
                          [0,0,0,0,0,0,0,0,0,0.9],//expected out 9
                          [0,0,0,0,0,0,0.9,0,0,0]//expected out 6
                        ]
//console.log(network.activationFunc);
for(var i=0;i<trainingDataInputs.length;i++){
  network.train(trainingDataInputs[i],trainingDataTargs[i]);

}
