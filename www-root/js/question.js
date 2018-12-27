var QuizGame = QuizGame || {};
QuizGame.Question = function () {
}

QuizGame.Question.prototype = {
    init:function(category,currentQuestionIndex,remainingLives,score){
        this.categoryIndexSelected = category;
        this.currentQuestionIndex = currentQuestionIndex;
        this.remainingLives = remainingLives;
        this.score = score;
    },
    preload:function(){

    },
    create:function(){
        this.marioWinSound = this.game.add.audio('mario_haha');
        this.marioLoseSound = this.game.add.audio('mario_lose');
        this.rectCanvas = QuizGame.Utils.getRectCanvas();
        var data = this.game.cache.getJSON('questions');
        this.data = data;
        this.totalLives = data.lives;

        var imageQuestion = this.showImageQuestion(this.categoryIndexSelected,this.currentQuestionIndex);
        this.livesGroups = this.showLives(this.remainingLives);
        var questionItem = this.getQuestionItem(this.categoryIndexSelected,this.currentQuestionIndex);
        this.showQuestion(questionItem,imageQuestion);
        var totalQuestions = this.listQuestionsByCategory(this.categoryIndexSelected).length
        this.showScore(this.score,totalQuestions);
        this.showExitButton();
    },
    showQuestion:function(questionItem,imageQuestion){
        var questionTitleElement = this.addQuestionTitle(questionItem.question,imageQuestion);
        this.addButtonsChoice(questionItem.choices,questionItem.answer,questionTitleElement);
    },
    addQuestionTitle:function(textContent,imageQuestion){
        var questionTitleElement = this.game.add.text(0,0,textContent, {
            font: "24pt Audiowide", 
            fill: "#000000", 
            wordWrap: true,  
            wordWrapWidth:800,
            align: "left", 
            backgroundColor: '#ffffff' 
        });
        questionTitleElement.alignTo(imageQuestion,Phaser.BOTTOM_CENTER);
        return questionTitleElement;
    },
    addButtonsChoice:function(choicesText,answerIndex,questionTitleElement){
        var groupButtons = this.game.add.group();
        var previousGroup;
        for(var index=0;index<choicesText.length;index++){
            var isRightAnswer = (index===answerIndex);
            var group = this.addChoiceGroup(choicesText[index],isRightAnswer);
            if(previousGroup){
                group.alignTo(previousGroup, Phaser.BOTTOM_LEFT, 0);
            }
            previousGroup = group;
            groupButtons.add(group);
        }
        groupButtons.alignTo(questionTitleElement, Phaser.BOTTOM_CENTER, 0);
    },
    addChoiceGroup:function(title,isRightAnswer){
        var button = this.game.add.button(0,0, 'button', this.onButtonChoiceClicked, {context:this,isRightAnswer:isRightAnswer}, 2, 1, 0);
        button.scale.set(0.5);
        var text = this.game.add.text(0,0,title, {font: "12pt Audiowide", fill: "#000000", wordWrap: false,  align: "left", backgroundColor: '#ffffff' });
        text.alignTo(button, Phaser.RIGHT_CENTER, 0);
        var group = this.game.add.group();
        group.add(button);
        group.add(text);
        return group;
    },
    onButtonChoiceClicked:function(){
        var context = this.context;
        if(this.isRightAnswer){
            context.score++;            
            context.marioWinSound.play();
        }else{
            context.marioLoseSound.play();
            context.remainingLives--;
        }
        if(context.remainingLives>0){
            context.game.state.start('answer',true,false,context.categoryIndexSelected,context.currentQuestionIndex,this.isRightAnswer,context.remainingLives,context.score);
        }else{
            var isWin = false
            context.game.state.start('endgame',true,false,isWin);
        }
    },
    listQuestionsByCategory:function(categoryIndex){
        return this.data.categories[categoryIndex].questions;
    },
    getQuestionItem(categoryIndex,questionIndex){
        return this.listQuestionsByCategory(categoryIndex)[questionIndex];
    },
    showImageQuestion: function(categoryIndex,questionIndex){
        var key = ['image_question',categoryIndex,questionIndex].join('_');
        var image_question = this.game.add.image(0,0, key);
        var scale = 1;
        if(image_question.height > QuizGame.Constants.maxHeightImageQuestion){
            scale = QuizGame.Constants.maxHeightImageQuestion/image_question.height;      
        }
        image_question.scale.set(scale);
        image_question.alignIn(this.rectCanvas,Phaser.TOP_CENTER);
        return image_question;
    },
    showLives:function(lives){
        var group = this.game.add.group();
        var previous;
        for(var index=0;index<lives;index++){
            var heart = this.game.add.sprite(0,0, 'heart');
            if(previous){
                heart.alignTo(previous, Phaser.RIGHT_CENTER, 0);
            }
            previous = heart;
            group.add(heart);
        }
        group.alignIn(this.rectCanvas,Phaser.TOP_RIGHT)
        return group;
    },
    showScore:function(score,total){
        var style = { 
            font: "20pt Audiowide", fill: "#7C00F8", wordWrap: false,  align: "right", backgroundColor: '#ffffff'
        };
        var textContent = 'Score : '+score+'/'+total;
        var textEl = this.game.add.text(0,0,textContent, style);
        textEl.alignTo(this.livesGroups,Phaser.BOTTOM_RIGHT);
    },
    showExitButton:function(){
        var button = this.game.add.button(0,0, 'exitButton', this.onButtonExitClicked, this, 2, 1, 0);        
        button.alignIn(this.rectCanvas,Phaser.BOTTOM_RIGHT);
    },
    onButtonExitClicked:function(){
        this.game.state.start('intro');
    }
}