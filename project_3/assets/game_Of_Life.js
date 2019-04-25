const row_size = 90;
const col_size = 90;

var rows = row_size;
var cols = col_size;

const  res = 10;




function draw_grid( rctx, rminor, rmajor, rstroke, rfill , res)
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix / res, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy / res, 0, iy + 10 );}
    }
    rctx.restore( );
}


function createMatrix(rows,cols ){

  let myArr = new Array(rows);
  for (let i = 0 ; i < myArr.length; i++){
      myArr[i] = new Array(cols);
      //myArr[i] = 0;
  }
  return myArr;
}


//let  grid = createMatrix(row_size,col_size);


function setup(grid){


  for (let i = 0 ; i < row_size ; i ++ ){
    for(let j = 0 ; j < col_size; j ++ ){
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return grid;
}




function fill_cell (ctx, row, col) {
   ctx.save();

    const cell_length = 10;
    ctx.fillStyle = 'yellow';

    ctx.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);

    ctx.restore();
}

function delete_cell (ctx, row, col) {
   ctx.save();

   const cell_length = 10;
   ctx.fillStyle = 'white';

   ctx.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);

  ctx.restore();
  return ctx;
}




function draw(ctx,grid)
{


  for (let i = 0 ; i < row_size ; i ++ ){
    for(let j = 0 ; j < col_size; j ++ ){
      if (grid[i][j]==1){
         fill_cell(ctx,i,j);
      }
    }
  }
}


function delete_grid(grid)
{


  for (let i = 0 ; i < row_size ; i ++ ){
    for(let j = 0 ; j < col_size; j ++ ){
         grid[i][j] = 0;


    }
  }
  return grid;
}



function delete_canvas(ctx)
{


  for (let i = 0 ; i < row_size ; i ++ ){
    for(let j = 0 ; j < col_size; j ++ ){
         delete_cell(ctx,i,j);

    }
  }
  return ctx;
}





function game_Of_Life_Rules(grid){

    let next = createMatrix(row_size,col_size);

    for (let i = 0 ; i < row_size ; i ++ ){
      for(let j = 0 ; j < col_size; j ++ ){
        let cell = null;
        let state = grid[i][j];
         if (i == 0 || i == row_size -1 || j == 0 || j == col_size - 1){
           next[i][j]= state;
         }else{
         let alive_neighbors = 0 ;
         alive_neighbors  = countAliveNeighbors(grid,i,j);

        var Alive = 1;
        var Dead =  0;
         if (state == 1){
            cell = Alive;
        }else{
            cell = Dead;
        }

        if (cell == Dead && alive_neighbors == 3 ){
          next[i][j] == 1;
        }else if (cell == Alive &&  (alive_neighbors < 2 || alive_neighbors > 3 )){
          next[i][j] == 0;
        }else{
            next[i][j] = state;
        }

       }
      }
    }


    return next;
}


function countAliveNeighbors(grid,x_pos,y_pos){
  let sum = 0 ;
  for (let i = -1 ; i < 2; i++){
    for(let j = -1 ; j < 2 ; j++){
       sum+=grid[x_pos + i][y_pos + j];
    }
  }
  sum -= grid[x_pos][y_pos];
  return sum;
}





function main (ctx){
  var  grid = createMatrix(row_size,col_size);
  grid = setup(grid);
  draw_grid( ctx, 10, 50, 'MidnightBlue', 'YellowGreen',10);
  function myTimer() {

// for (let i = 0 ; i < 10; i ++ ){
//          //   //let  grid1 = createMatrix(row_size,col_size);
                draw(ctx,grid);
                grid = setup(grid);

                //grid = delete_grid(grid);
                ctx =  delete_canvas(ctx);
                draw_grid( ctx, 10, 50, 'MidnightBlue', 'YellowGreen',10);

                draw(ctx,grid);
//
//               ctx =  delete_canvas(ctx);
//
//          //
//          //
//          // }
//          //
//
//
//
//          //
//          // grid1 = game_Of_Life_Rules(grid);
//          // delete_grid(grid,ctx);
//          // draw(ctx,grid1);
//          // grid = game_Of_Life_Rules(grid1);
//          // draw(ctx,grid);
//          // delete_grid(grid1,ctx);
//   //       count ++;
//   //     }
//
//            grid = setup(grid);
//   }

}
var myVar = setInterval(myTimer, 250);
}
