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
```

## Run the game
```sh
grunt
```

open in your browser localhost:7000/

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

* We have to create json file to assets pack. Just run the command below:
```sh
grunt generate-pack-json
```