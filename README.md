Games in Backbone.js
====================

This app is an implementation of two games in Backbone.js - Hangman and Tic Tac
Toe Flow.

Hangman rules are standard. The player (you) attempts to guess the letters in a
word. If more than 8 incorrect guesses are attempted, the game is over and the
player has lost. If the player guesses the word before using up their
incorrect guesses, they have won. This game is for 1 player.

Tic Tac Toe Flow (TTTF) is very similar to the regular version, with one major
difference - each player can have no more than 3 pieces on the board at
any given point. When a player goes to place a piece which will be their fourth
piece, the oldest piece is removed. Thus, it is important to keep track of which
of your pieces will be removed upon your next move.

For this implementation of TTTF, there are two options for play. A single human
player may play against a basic AI, named 'Gregbot'. Two human players may also
play against each other on two different computers. This is accomplished using
Firebase.

