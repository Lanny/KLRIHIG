var notes = [];
var resolution = 10;

setinletassist(0,"input");
setoutletassist(0,"chord");

function list(note, duration) {
	notes.push(note + '-' + ~~(duration / resolution) * resolution);
}

function setresolution(res) {
	resolution = ~~res;
}

function bang() {
	
	if (notes.length) {
		outlet(0, notes.join('/'));
		notes = [];
	}
}

function shownotes() {
	post(JSON.stringify(notes));
}
