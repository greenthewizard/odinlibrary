let $bookList = document.getElementById("book-list");

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

function renderLibrary() {
	//Clear list
	while($bookList.firstChild) {
		$bookList.removeChild($bookList.firstChild);
	}

	myLibrary.forEach((book, i) => {
		//Create and customize list item
		let $newLi = document.createElement('li');
		let $newA = document.createElement('a');

		$newA.setAttribute('href', '#');
		$newLi.setAttribute('id', 'book-' + i);
		$newLi.classList.add('book');
		if (book.read) {
			$newLi.classList.add('read');
		}

		//Populate book
		$text = document.createTextNode(book.title + ", by " + book.author);
		$newA.appendChild($text);
		$newLi.appendChild($newA);

		//Add event listener
		$newA.addEventListener('click', e => {
			book.toggleRead();
			renderLibrary();
		});

		$bookList.appendChild($newLi);
	});
}

addBookToLibrary("Ready Player One", "Ernest Cline");
addBookToLibrary("Seven Eves", "Neil Stephenson");
addBookToLibrary("The Fault in Our Stars", "John Green");
renderLibrary();