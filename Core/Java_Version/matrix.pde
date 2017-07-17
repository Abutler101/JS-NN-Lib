class Matrix{
 int rows, cols;
 float[][] matrix;
 //CONSTRUCTOR
 Matrix(int rows,int cols){
   this.rows = rows;
   this.cols = cols;
   float [][] matrix= new float[this.rows][this.cols];
   for(int i=0;i<this.rows;i++){
     for(int j=0;j<this.cols;j++){
       matrix[i][j]=0;  
     }
   }
   this.matrix = matrix;
 }
 //RANDOMISER
  void randomise(){
  for(int i=0; i< this.rows; i++){
    for(int j=0; j<this.cols; j++){
      this.matrix[i][j] = floor(random(1,10));
      println(this.matrix[i][j]);
    }
  }
}
 //CONV TO ARRAY
  float[] convToArray(){
  float[] array;
  for(int i = 0;i<this.rows;i++){
    for(int j = 0;j<this.cols;j++){
      array[array.length+1]=this.matrix[i][j];
    }
  }
  return array;
}
 //TRANSPOSE
 
 //COPY
 
 //MULTIPLY
 
 //ADD
 
}
 //MAP
 
 //SUBTRACT
 
 //DOT
 
 //CONV FROM ARRAY
 