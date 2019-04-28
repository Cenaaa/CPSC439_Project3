class Matrix {
    initialize_Canvas(myheight, mywidth) {
        this.myheight = myheight;
        this.mywidth = mywidth;
        document.getElementById('grid_Game_Of_Life').width = this.mywidth*10;
        document.getElementById('grid_Game_Of_Life').height = this.myheight*10;
        var canvas  = document.getElementById( "grid_Game_Of_Life" );
        var context = canvas.getContext( "2d" );
        return context;
    }

    set_up_grid(row_size,col_size,res){
      var row = row_size;
      var col = col_size;
      var ctx = this.initialize_Canvas(row,col);
      var grid = this.create_Matrix(row_size, col_size);
      grid = this.initialize_Matrix(grid);
      this.draw_Matrix(ctx, grid);
      this.draw_Canvas(ctx, 10, 50, 'MidnightBlue', 'YellowGreen', res);
      return grid;
     }

     main(grid){
       var grid = this.game_Of_Life_Rules(grid);
       var canvas  = document.getElementById( "grid_Game_Of_Life" );
       var context = canvas.getContext( "2d" );
       context = this.delete_canvas(context);
       this.draw_Matrix(context, grid);
       this.draw_Canvas(context, 10, 50, 'MidnightBlue', 'YellowGreen', res);
       // const canvas = document.getElementById('grid_Game_Of_Life');
       // var ctx = canvas.getContext('2d');
       // var grid =  this.get_grid(ctx);


       return grid;

     }

     // get_grid(ctx){
     //   const col_size = document.getElementById('grid_Game_Of_Life').width;
     //   const  row_size = document.getElementById('grid_Game_Of_Life').height;
     //   var grid = this.create_Matrix(row_size/10, col_size/10);
     //          for (let i = 0; i < row_size; i=i+10) {
     //            for (let j = 0; j < col_size; j=j+10) {
     //              var imgData = ctx.getImageData(i, j, 1, 1);
     //              if( imgData.data[0] == 255 && imgData.data[1] == 250 &&  imgData.data[2] == 250 && imgData.data[3] == 255 ){
     //                grid[Math.floor(i/10) ] [Math.floor(j/10)] = 0;
     //              }else{
     //                grid[Math.floor(i/10)][Math.floor(j/10)] = 1;
     //              }
     //          }
     //      }
     //      return grid;
     // }

     draw_title( context ){
        context.save( );
        context.fillStyle = 'lightgrey';
        context.font = "30px Arial";
        context.fillText( "Grid", 150, 140 );
        context.restore( );
    }

     draw_Canvas(rctx, rminor, rmajor, rstroke, rfill, res) {
        rctx.save();
        rctx.strokeStyle = rstroke;
        rctx.fillStyle = rfill;
        let width = rctx.canvas.width;
        let height = rctx.canvas.height;
        for (var ix = 0; ix < width; ix += rminor) {
            rctx.beginPath();
            rctx.moveTo(ix, 0);
            rctx.lineTo(ix, height);
            rctx.lineWidth = (ix % rmajor == 0) ? 0.5 : 0.25;
            rctx.stroke();
            if (ix % rmajor == 0) {
                rctx.fillText(ix / res, ix, 10);
            }
        }
        for (var iy = 0; iy < height; iy += rminor) {
            rctx.beginPath();
            rctx.moveTo(0, iy);
            rctx.lineTo(width, iy);
            rctx.lineWidth = (iy % rmajor == 0) ? 0.5 : 0.25;
            rctx.stroke();
            if (iy % rmajor == 0) {
                rctx.fillText(iy / res, 0, iy + 10);
            }
        }
        rctx.restore();
    }

     create_Matrix(rows, cols) {

        let myArr = new Array(rows);
        for (let i = 0; i < myArr.length; i++) {
            myArr[i] = new Array(cols);
        }
        return myArr;
    }

     initialize_Matrix(grid) {
        for (let i = 0; i < row_size; i++) {
            for (let j = 0; j < col_size; j++) {
                grid[i][j] = Math.floor(Math.random() * 2);
            }
        }
        return grid;
    }

     fill_cell(ctx, row, col) {
        ctx.save();
        const cell_length = 10;
        ctx.fillStyle = 'rgb(128,0,128,0.6)';
        ctx.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
        //ctx.stroke();
        ctx.restore();
    }

     delete_cell(ctx, row, col) {
        ctx.save();
        const cell_length = 10;
        ctx.fillStyle = 'Snow';
        ctx.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
        ctx.restore();
        return ctx;
    }

     draw_Matrix(ctx, grid) {
        for (let i = 0; i < row_size; i++) {
            for (let j = 0; j < col_size; j++) {
                if (grid[i][j] == 1) {
                    this.fill_cell(ctx, i, j);
                }
            }
        }
    }

     delete_grid(grid) {
        for (let i = 0; i < row_size; i++) {
            for (let j = 0; j < col_size; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }

     delete_canvas(ctx) {
        for (let i = 0; i < row_size; i++) {
            for (let j = 0; j < col_size; j++) {
                this.delete_cell(ctx, i, j);

            }
        }
        return ctx;
    }

     game_Of_Life_Rules(grid) {

        var next = this.create_Matrix(row_size, col_size);
        var alive_neighbors = 0;
        var state = 0 ;

        for (let i = 0; i < row_size; i++) {
            for (let j = 0; j < col_size; j++) {
                    state = grid[i][j];
                if (i == 0 || i == row_size - 1 || j == 0 || j == col_size - 1) {
                    next[i][j] = state;
                } else {
                    //alive_neighbors = 0;
                    alive_neighbors = this.countAliveNeighbors(grid, i, j);
                    switch (alive_neighbors) {
                      case 0:
                      if (state == 1){
                      next[i][j] = 0 ;
                      }else{
                      next[i][j] = state;
                      }
                      break;
                      case 1:
                      if (state == 1){
                      next[i][j] = 0;
                      }else{
                      next[i][j] = state;
                      }
                      break;
                      case 2:
                      if (state == 1){
                      next[i][j] = 1;
                      }else{
                      next[i][j] = state;
                      }
                      break;
                      case 3:
                      if (state == 1){
                      next[i][j] = 1;
                      }else{
                      next[i][j] = 1;
                      }
                      break;
                      default:
                      if (state == 1){
                      next[i][j] =0 ;
                      }else{
                      next[i][j] =state ;
                     }
                      break;
                    }

                    }
                
            }
        }
        return next ;
    }

     countAliveNeighbors(grid, x_pos, y_pos) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                sum += grid[x_pos + i][y_pos + j];
            }
        }
        sum -= grid[x_pos][y_pos];
        return sum;
    }


}
