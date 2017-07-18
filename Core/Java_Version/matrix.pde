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
  ArrayList convToArray(){
    ArrayList out;
    out = new ArrayList<Float>();
    for(int i = 0;i<this.rows;i++){
      for(int j = 0;j<this.cols;j++){
        out.add(this.matrix[i][j]);
      }
    }
    return out;
  }
 //TRANSPOSE
  Matrix transpose(){
     Matrix out;
     out = new Matrix(this.cols,this.rows);
     for(int i = 0;i<out.rows;i++){
        for(int j = 0;j<out.cols;j++){
          out.matrix[i][j] = this.matrix[j][i];
        }
      }
     return out;
   }
 //MULTIPLY
 void multiply(int n){
    for(int i=0; i< this.rows; i++){
      for(int j=0; j<this.cols; j++){
        this.matrix[i][j] *= n;
      }
    }
 }
 //ADD
 void add(int n){
   for(int i=0; i< this.rows; i++){
      for(int j=0; j<this.cols; j++){
        this.matrix[i][j] += n;
      }
    }
 }
 
}
 //MAP
 Matrix map(Matrix m,func func){
  Matrix out = new Matrix(m.rows,m.cols);
  for(int i = 0;i<out.rows;i++){
    for(int j = 0;j<out.cols;j++){
      out.matrix[i][j] = func(m.matrix[i][j]);
    }
  }
  return out;
}
 //SUBTRACT
 
 //DOT
 
 //CONV FROM ARRAY
 