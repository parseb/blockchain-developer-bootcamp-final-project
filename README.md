
# Final Project Idea(s)

* Chess Wager
* Proof of Pizza
* Participative Budgeting with Quadratic Funding

## __Chess Wager__


Chess game allowing players to place a bet on who will win.


1. Players 1 accesses website, identifies (metamask?) and creates a new custom game. <br>
    (Parameters: global time limit, time increments, timeout, bet size, white/back/random, address to send funds to in case of draw [no refunds])
2. Player 1 submits the game object and signs consent   for contract execution.

3. Player 2 accesses the game page, verifies game parameters and sings agreement.

4. Players need to indicate they are ready for the game to start.

5. White starts, each move is signed and stored in the contract (unnecessary overhead ?)

6. The game ends. (player wins, draw, resignation, timeout) Funds are transfered to the game endstate destination wallet.

    ### Known Unknows Design Choices
    * Best game state for wager deposit (at creation and at join VS at end execution)
    * No frontend option -> onchain state and execution

    ### Problems
    * Cheating (detection / escrow / blind peer review VS it_is_what_it_is VS cheat as ingame variable)

    ### Business model

    ### Will make use of : 
    *   [chess.js](https://github.com/jhlywa/chess.js.git)
    *   [chessboard.js](https://github.com/oakmac/chessboardjs/)

___

## __Proof of pizza__
Themes: Distributed Democratic Ownership, Social Economy


## __Participative Budgeting with Quadratic Funding__
Themes: Participative Democracy Platform ([Porto Alegre](https://www.wri.org/insights/what-if-citizens-set-city-budgets-experiment-captivated-world-participatory-budgeting))