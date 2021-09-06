
# Final Project Idea(s)


## __Chess Wager__
**Themes**: board game, confidence check
<br>

1 vs 1 game indulging the ego of friendly chess rivals by allowing them to stake on their chess prowess. In case of draw or stalemate funds are redirected to a mutually agreed upon wallet.

<br>

1. Alice authenticates and creates a new custom game. <br>

2. Alice submits the game object and signs consent for contract execution.

3. Bob accesses the game page, verifies game parameters and gives consent.

4. Alice and Bob indicate they are ready for the game to start.

5. White starts, each move is signed and stored onchain.

6. Winner or lackthereof is determined.

7. Game balance is transfered to the legitimate wallet.

    <br>

    ### Known Unknows / Design Choices
    * Best game state for wager deposit (at creation and at join VS at end execution)
    * Secret asymetric bet size (requires endgame state player cooperation?)
    * No frontend option -> onchain state and execution
    * Identity management (in-browser persistent authentication)
    * Storing moves onchain -> unnecessary overhead or worth it
    * Game parametes: {global_time_limit, on_move_time_increment, timeout_nomove, timeout_noshow, bet_size, color_random, third_party_address, player1_address, player2_address}
    * Predeterined third party donation wallet options (EDRi, EFF, WWF)
    
    <br>

    ### Problems
    * Cheating (detection / escrow / blind peer review VS cheaters_be_cheating (it_is_what_it_is) VS cheat as ingame variable)
    
    <br>


    ### Business model

    <br>

    ### Variations

    * Chess Engine (AI) vs Chess Engine (AI) competition with predefined category time limit. (don't think blocktime is an issue as long as they are hashed with submission time in queue - I def. don't yet understand this.)

    <br>

    ### Supply chain 
    *   [chess.js](https://github.com/jhlywa/chess.js.git)
    *   [chessboard.js](https://github.com/oakmac/chessboardjs/)

<br>

___

<br>


## __Proof of pizza__
**Themes**: Distributed Democratic Ownership, Social Economy

<br>

___

<br>



## __Participative Budgeting with Quadratic Funding__
**Themes**: Participative Democracy ([Porto Alegre](https://www.wri.org/insights/what-if-citizens-set-city-budgets-experiment-captivated-world-participatory-budgeting)), Public Sector