document.addEventListener('DOMContentLoaded', function() {

	var divBoard = document.querySelector('.column-wrapper');

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';

		for(var i = 0; i < 10; i++) {
			str = str + chars[Math.floor(Math.random() * chars.length)];
		}

		return str;
	}

	// Create column constructor

	function Column(title) {
		var self = this;

		this.id = randomString();
		this.title = title || 'My column';
		this.element = addColumn();

		function addColumn() {
			var divColumn = document.createElement('div');
			divColumn.classList.add('column-container');

			var headerColumn = document.createElement('div');
			headerColumn.classList.add('column-header'); 

			var titleColumn = document.createElement('h2');
			titleColumn.textContent = titleColumn.textContent + self.title;
			titleColumn.classList.add('column-title');

			var createCard = document.createElement('button');
			createCard.classList.add('btn-addCard', 'fas', 'fa-plus');
			createCard.textContent += 'Add Card';

			var removeColumnButton = document.createElement('button');
			removeColumnButton.classList.add('btn-removeColumn', 'fas', 'fa-times');
			removeColumnButton.textContent += 'Remove Column';

			divColumn.appendChild(headerColumn);
			divBoard.appendChild(divColumn);
			headerColumn.appendChild(titleColumn);
			headerColumn.appendChild(removeColumnButton);
			headerColumn.appendChild(createCard);

			return divColumn;
		}

		this.element.addEventListener('click', function(e) {

			if(e.target.classList.contains('btn-removeColumn')) {
				var conf = confirm('Are you sure?');
				if(conf) {
					self.removeColumn();
				} else {
					return;
				}
			}

			if(e.target.classList.contains('btn-addCard')) {
				var description = prompt('Please, enter the name of the task');
				var card = new Card(description);
				self.addCard(card);
			}
		});
	}

	Column.prototype = {
		removeColumn: function() {
			this.element.parentNode.removeChild(this.element);
		},
		addCard: function(card) {
			this.element.appendChild(card.element);
		}
	}


	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.element = createCard();

		function createCard() {
			var cardContainer = document.createElement('div');
			cardContainer.classList.add('card-container');

			var card = document.createElement('div');
			card.classList.add('card');

			var textCard = document.createElement('p');
			textCard.classList.add('card-text');
			textCard.textContent += self.description;

			var cardAction = document.createElement('div');
			cardAction.classList.add('card-cta');

			var deleteCardButton = document.createElement('button');
			deleteCardButton.classList.add('btn-deleteCard', 'fas' ,'fa-times');

			
			card.appendChild(textCard);
			cardAction.appendChild(deleteCardButton);
			card.appendChild(cardAction);
			cardContainer.appendChild(card);

			return cardContainer;

		}


		this.element.addEventListener('click', function(e) {
			if(e.target.classList.contains('btn-deleteCard')) {
				e.stopPropagation();
				self.removeCard();
			}
		});

	}

	Card.prototype = {
		removeCard: function() {
			this.element.parentNode.removeChild(this.element);
		}
	}

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.element.appendChild(column.element);
			column.element.id = column.id;
			initSortable(column.element.id);
		},
		element: document.querySelector('#board .column-wrapper')
	}

	function initSortable(id) {
		var el = document.getElementById(id);
		var sortable = Sortable.create(el, {
			group: 'kanban',
			sort: true,
			draggable: '.card-container'
		});
	}


	document.querySelector('#addColButton').addEventListener('click', function() {
		var title = prompt('Please, enter a column title');
		var column = new Column(title);
		board.addColumn(column);
	});


	var todoColumn = new Column('To Do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	var taskFirst = new Card('First task');
	var taskSecond = new Card('Second task');
	var taskThird = new Card('Third task');

	todoColumn.addCard(taskFirst);
	doingColumn.addCard(taskSecond);
	doneColumn.addCard(taskThird);


});