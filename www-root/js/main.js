var QuizGame = QuizGame || {};
QuizGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
QuizGame.game.state.add('boot', QuizGame.Boot);
QuizGame.game.state.add('intro', QuizGame.Intro);
QuizGame.game.state.add('question', QuizGame.Question);
QuizGame.game.state.add('answer', QuizGame.Answer);
QuizGame.game.state.add('endgame', QuizGame.EndGame);
QuizGame.game.state.start('boot');



