//
// Класс матрицы.
//
function Matrix(containerId, rows, cols) {
	
	// jQuery-объект контейнера
	var matrix = $(containerId);
	
	// число строк
	this.rows = rows;
	
	// число столбцов
	this.cols = cols;


    this.destruct = function() {
        delete matrix;
        delete this.rows;
        delete this.cols;
    }
	
	
	// создание сетки
	this.create = function() {
		for (var i = 0; i < (this.rows * this.cols); i++) {

			//var text = Math.floor(Math.random()*2);
			matrix.append('<div class="'+attrClassCell+'"></div>');
		}
	};
	
	
	// получить значение ячейки
	this.getCell = function(row, col, name) {
		var index = (row - 1) * this.cols + col - 1;
		return matrix.children().eq(index).hasClass(name);
	};
	
	
	// установить значение ячейки
	this.setCell = function(row, col, name, val) {
		var index = (row - 1) * this.cols + col - 1;
		matrix.children().eq(index).toggleClass(name, val);
	};


	this.clear = function() {
		$(containerId).empty();
	};
}
		
