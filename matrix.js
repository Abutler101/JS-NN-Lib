//var matrix = new Matrix(3,2)
//console.table(matrix.matrix)
function Matrix(rows,cols){
  this.rows=rows;
  this.cols=cols;
  this.matrix= [];

  for(var i =0; i<this.rows; i++){
    this.matrix[i] = [];
    for(var j=0;j<this.cols;j++){
      this.matrix[i][j] = 0;
    }
  }
}

Matrix.prototype.randomise = function(){
  for(var i=0; i< this.rows; i++){
    for(var j=0; j<this.cols; j++){
      this.matrix[i][j] = Math.floor(Math.random() * 10)
    }
  }
}

Matrix.prototype.convToArray = function(){
  var array = [];
  for(var i = 0;i<this.rows;i++){
    for(var j = 0;j<this.cols;j++){
      arr.push(this.matrix[i][j]);
    }
  }
  return array;
}

Matrix.prototype.transpose = function(){
  var out = new Matrix(this.cols,this.rows);
  for(var i = 0;i<this.rows;i++){
    for(var j = 0;j<this.cols;j++){
      out.matrix[i][j] = this.matrix[j][i];
    }
  }
  return out;
}

Matrix.prototype.copy = function(){
  var out = new Matrix(this.rows, this.cols);
  for(var i = 0;i<this.rows;i++){
    for(var j = 0;j<this.cols;j++){
      out.Matrix[i][j]=this.Matrix[i][j];
    }
  }
  return out;
}

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

Matrix.map = function(){


}

Matrix.subtract = function(){


}

Matrix.dot = function(){


}

Matrix.convFromArray = function(){


}
