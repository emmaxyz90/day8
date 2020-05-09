const gameBoard = (() =>{
	const text = ['', '', '', '', '', '', '', '', ''];
	return {text};
})();

const displayController = (() =>{
	//determines if the spot marked should be an x or O based on who's turn it is
	const markSpot = () =>{
		turnText = document.querySelector('.turnText');
		turnText.textContent = 'Player 1 Turn';
		const squares = document.querySelectorAll('.square');
		const markPlayer = player();
		document.addEventListener('click', function printToGrid(event){
			if (event.target.matches('.square')){
				for (let i= 0; i < squares.length; i++){
					if (event.target.matches('.square${i}')){
						if (markPlayer.winner() === false && event.target.textContent === ''){
							let newMark;
							if (markPlayer.playerTurn() === 'p1'){
								newMark = 'x';
								turnText.textContent = 'Player 2 Turn';
							}
							if (markPlayer.playerTurn() === 'p2'){
								newMark = 'o';
								turnText.textContent = 'Player 1 Turn';
							}
							gameBoard.text.splice(i, 1, newMark);
							render();
						}
						if (markPlayer.winner() !== false){
							turnText.textContent = markPlayer.winner();
						};
						reset(turnText);
						turnText.textContent = 'Player 1 Turn';
					};
					function reset(text){
						const resetButton = document.querySelector('.resetButton');
						resetButton.addEventListener('click', function resetStuff(){
							gameBoard.text = ['', '', '', '', '', '', '', '', ''];
							text.textContent = 'Player 1 Turn';
							render();
						});
					}
				}
				
				//prints x's and o's onto the screen
				function render(){
					const squares = document.querySelectorAll('.square');
					for (let i=0; i<squares.length; i++){
						squares[i].textContent = gameBoard.text[i];
					}
				}
				return {markSpot};
			}
		})();
		
		const player = () => {
			const playerTurn = () =>{
				const numx = countMarked().x;
				const numo = countMarked().o;
				if(numx > numo){
					return 'p2';
				}
				if(numx=== numo){
					return 'p1';
				}
			};
			
		};
		
		//checks for the winner of the game
		const winner = () =>{
			//creates an object with all the possible winning combinations of ti tac toe
			const winCombos = {
				0: [0, 1, 2],
				1: [3, 4, 5],
				2: [6, 7, 8],
				3: [0, 3, 6]'
				4: [1, 4, 7],
				5: [2, 5, 8],
				6: [0, 4, 8],
				7: [2, 4, 6]
			};
			//if there are less than three x's there can't possibly be a winner yet
			if (countMarked().x < 3){
				return false;
			}
			//find the indices of all the x's and o's
			const indicesOfx = getAllIndices(gameBoard.text, 'x');
			const indicesOfo = getAllIndices(gameBoard.text, 'o');
			//compare indices of x's and o's to winning combinations
			for (let x=0; x < Object.keys(winCombos[x].length; x++)){
				let numMatchedo = 0;
				let numMatchedx = 0;
				for (let i= 0; i < indicesOfx.length; i++){
					for (let j=0; j < winCombos[x].length; j++){
						if (indicesOfx[i] === winCombos[x][j]){
							numMatchedx += 1;
							if (numMatchedx ===3){
								return 'Player 1 Wins';
							}
						}
						if (indicesOfo[i] === winCombos[x][j]){
							numMatchedo +=1;
							if (numMatchedo === 3){
								return 'Player 2 Wins';
							}
						}
					}
				}
			}
			if (countMarked().x === 5 && countMarked().o ===4){
				return 'Tie';
			}
			return false;
		}
	
	
		// private functions that are only called within player()
		//gets all Indexes of a value in an array
		function getAllIndices(arr, val){
			let indexes = [],
			i;
			for (i=0; i < arr.length; i++){
				if (arr[i] === val){
					indexes.push(i);
				}			
			}
			return indexes;
		}
		//counts the number of x's and o's to determoine who's turn is next
		function countMarked(){
			let numx =0;
			let numo =0;
			for (let i = 0; i < gameBoard.text.length; i++){
				if (gameBoard.text[i] === 'x'){
					numx +=1;
				}
				
				if (gameBoard.text[i] === 'o'){
					numo +=1;
				}
			}
			return {x: numx, o: numo};
		}
		return {playerTurn, winner};
	
	};
}
displayController.markSpot();