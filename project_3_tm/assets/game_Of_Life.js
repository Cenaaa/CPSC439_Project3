let tmHistory = [];
let tmIndex = 0;

class Matrix {
    initialize_Canvas(myheight, mywidth) {
        this.myheight = myheight;
        this.mywidth = mywidth;
        document.getElementById('grid_Game_Of_Life').width = this.mywidth * 10;
        document.getElementById('grid_Game_Of_Life').height = this.myheight * 10;
        var canvas = document.getElementById("grid_Game_Of_Life");
        var context = canvas.getContext("2d");
        return context;
    }

    set_up_grid(row_size, col_size, res) {
        var row = row_size + 2;
        var col = col_size + 2;
        var ctx = this.initialize_Canvas(row_size, col_size);
        var grid = this.create_Matrix(row, col);
        grid = this.initialize_Matrix(grid);
        this.draw_Matrix(ctx, grid);
        this.draw_Canvas(ctx, 10, 50, 'MidnightBlue', 'YellowGreen', res);
        return grid;
    }

    main(tm) {
        this.game_Of_Life_Rules(tm);
        var canvas = document.getElementById("grid_Game_Of_Life");
        var context = canvas.getContext("2d");
        context = this.delete_canvas(context);
        this.draw_Matrix(context, grid);
        this.draw_Canvas(context, 10, 50, 'MidnightBlue', 'YellowGreen', res);

    }


    draw_title(context) {
        context.save();
        context.fillStyle = 'lightgrey';
        context.font = "30px Arial";
        context.fillText("Grid", 150, 140);
        context.restore();
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
            myArr[i] = new Array(cols).fill(0);
        }
        return myArr;
    }

    initialize_Matrix(grid) {
        for (let i = 1; i < grid.length - 1; i++) {
            for (let j = 1; j < grid[0].length - 1; j++) {
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
        for (let i = 1; i < row_size + 1; i++) {
            for (let j = 1; j < col_size + 1; j++) {
                if (grid[i][j] == 1) {
                    this.fill_cell(ctx, i - 1, j - 1);
                }
            }
        }
    }

    draw_state_history(tm, tr) {
        let history = tm.stateHistory;
        tr.innerHTML = '';
        history.forEach(state => {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(state));
            tr.appendChild(td);
        });
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

    resetTmHead(tm) {
        console.log(tm);
        while(tm.head.x > 0) {
            tm.moveTape('left');
        }
        while(tm.head.y > 0) {
            tm.moveTape('up');
        }
    }

    game_Of_Life_Rules(tm) {
        
        let previousTM = new TuringMachine(null, null, tm);
        var alive_neighbors = 0;
        
        this.resetTmHead(tm);
        tm.moveTape('right');
        tm.moveTape('down');
        previousTM.moveTape('right');
        previousTM.moveTape('down');

        let horizDirection = 'right';
        while (tm.head.y < col_size + 1) { // replace 5 with col_size
            while (tm.head.x < row_size + 1 && tm.head.x > 0) { // replace 5 with row_size
                // tmHistory.push(new TuringMachine(null, null, tm));
                tm.changeState(previousTM.readHead());
                alive_neighbors = this.countAliveNeighbors(previousTM);
                switch (alive_neighbors) {
                    case 0:
                    if (tm.state == 1) {
                            tm.changeState(0);
                        }
                        break;
                    case 1:
                    if (tm.state == 1) {
                        tm.changeState(0);
                    } 
                    break;
                    case 2:
                    if (tm.state == 1) {
                        tm.changeState(1);
                    } 
                    break;
                    case 3:
                        tm.changeState(1);
                    break;
                    default:
                        if (tm.state == 1) {
                            tm.changeState(0);
                        }
                        break;
                }
                tm.writeHead(tm.state);
                tm.moveTape(horizDirection);
                previousTM.moveTape(horizDirection);
            }
            tm.moveTape('down');
            previousTM.moveTape('down');

            if(horizDirection == 'left') horizDirection = 'right';
            else horizDirection = 'left';
            tm.moveTape(horizDirection);
            previousTM.moveTape(horizDirection);
        }
        
    }

    countAliveNeighbors(tm) {
        let sum = 0;
        let path = ['up', 'right', 'down', 'down', 'left', 'left', 'up', 'up'];
        path.forEach(direction => {
            tm.moveTape(direction);
            // tmHistory.push(new TuringMachine(null, null, tm));
          sum += tm.readHead();
        });
        
        let returnToCenter = ['right', 'down'];
        returnToCenter.forEach(direction => {
            tm.moveTape(direction);
            // tmHistory.push(new TuringMachine(null, null, tm));
        });
        return sum;
    }


}
