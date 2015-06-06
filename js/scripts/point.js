function Point(row, col) {
	this.coordinate = {
		x: row || Math.round(Math.random()*(rows-1)+1),
		y: col || Math.round(Math.random()*(cols-1)+1)
	};
}