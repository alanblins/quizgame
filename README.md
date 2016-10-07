# quizgame
Quiz Game in Phaser

# Installation
## Pre requisites
 * NodeJS (https://nodejs.org/en/download/package-manager/)
 * grunt
 * bower

### Install bower
 * npm install -g bower
### Install grunt
 * npm install -g grunt
 * npm install -g grunt-cli

## Install the Quiz Game
```sh
git clone https://github.com/alanblins/quizgame.git
cd quizgame
npm i
cd www-root
bower i
cd ..
grunt
```
open in your browser localhost:7000/

# Change the questions
Just edit www-root/data/questions.json
```javascript
	{
		"question":"What is the chemical symbol for the element oxygen?",
		"answers":[
			"ox2",
			"O",
			"X",
			"G"
		],
		"correct":1
	},
```
"correct":1 - It means the second answer "O" is the correct.