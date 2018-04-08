let $bookList = document.getElementById('book-list');
let $newBookForm = document.getElementById('new-book-form');
let $btnForm = document.getElementById('btn-form');
let $btnAdd = document.getElementById('btn-add');
let $inpTitle = document.getElementById('title');
let $inpAuthor = document.getElementById('author');

let myLibrary = [
];

function Book(title, author) {
	this.title = title;
	this.author = author;
	this.read = false;
}

Book.prototype.toggleRead = function () {
	this.read = this.read ? false : true;
}

function addBookToLibrary(title, author) {
	myLibrary.push(new Book(title, author));
}

function removeBookFromLibrary(index) {
	myLibrary.splice(index, 1);
}

function renderLibrary() {
	//Clear list
	while($bookList.firstChild) {
		$bookList.removeChild($bookList.firstChild);
	}

	myLibrary.forEach((book, i) => {
		//Create and customize list item
		let $newLi = document.createElement('li');
		let $newA = document.createElement('a');
		let $newA2 = document.createElement('a');

		$newA.setAttribute('href', '#');
		$newLi.setAttribute('id', 'book-' + i);
		$newLi.classList.add('book');
		if (book.read) {
			$newLi.classList.add('read');
		}

		$text = document.createTextNode(book.title + ", by " + book.author);
		$newA.appendChild($text);
		$newA2.appendChild(document.createTextNode("x"));
		$newA2.classList.add('del')

		$newLi.appendChild($newA);
		$newLi.appendChild($newA2);

		//Add event listener
		$newA.addEventListener('click', e => {
			book.toggleRead();
			renderLibrary();
		});

		$newA2.addEventListener('click', e => {
			removeBookFromLibrary(i);
			renderLibrary();
		});

		$bookList.appendChild($newLi);
	});
}

$btnForm.addEventListener('click', e => {
	$newBookForm.classList.toggle('show');
	$btnAdd.classList.toggle('hide');
	$btnForm.classList.toggle('hide');
});

$btnAdd.addEventListener('click', e=> {
	let title = $inpTitle.value;
	let author = $inpAuthor.value;

	if (title != "" && author != "") {
		addBookToLibrary(title, author);
		renderLibrary();
	}
	$btnAdd.classList.toggle('hide');
	$btnForm.classList.toggle('hide');
	$newBookForm.classList.toggle('show');
});

addBookToLibrary("Ready Player One", "Ernest Cline");
addBookToLibrary("Seven Eves", "Neil Stephenson");
addBookToLibrary("The Fault in Our Stars", "John Green");
renderLibrary();