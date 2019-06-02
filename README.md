# quizgame
Quiz Game in Phaser - https://quizgamemegadojo.herokuapp.com/

# Installation
## Pre requisites
 * NodeJS (https://nodejs.org/en/download/package-manager/)
 

## Install the Quiz Game
```sh
git clone https://github.com/alanblins/quizgame.git
cd quizgame
npm i
```

## Run the game
```sh
npm start
```
open in your browser 
```
http://localhost:8080
```

# Change the questions
Just edit www-root/data/questions.json
```javascript
	{
		"question":"What is the chemical symbol for the element oxygen?",
		"choices":[
			"ox2",
			"O",
			"X",
			"G"
		],
		"answer":1
	},
```
"answer":1 - It means the second choice "O" is the correct answer.

# Insert image for each question.
* Copy the image to www-root/assets/images_questions/
* Insert the file name into the "image" key inside of questions.json like below:

```javascript
	{
		"question":"What is the chemical symbol for the element oxygen?",
		"choices":[
			"ox2",
			"O",
			"X",
			"G"
		],
		"answer":1,
		"image":"atlantic.png"
	},
```

* Then install again:
```sh
npm i
```
