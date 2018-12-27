var QuizGame = QuizGame || {};
QuizGame.Answer = function () {
}

QuizGame.Answer.prototype = {
    init:function(category,currentQuestionIndex,isRightAnswer,remainingLives,score){
        this.categoryIndexSelected = category;
        this.currentQuestionIndex = currentQuestionIndex;
        this.isRightAnswer = isRightAnswer;
        this.remainingLives = remainingLives;
        this.score = score;
    },
    create:function(){
        this.rectCanvas = QuizGame.Utils.getRectCanvas();
        this.data = this.game.cache.getJSON('questions');
        var imageQuestion = this.showImageQuestion(this.categoryIndexSelected,this.currentQuestionIndex);
        var imageAnswer = this.showImageAnswer(this.isRightAnswer,imageQuestion);
        this.showButtonNext(imageAnswer);
    },
    showImageAnswer:function(isRightAnswer,imageQuestion){
        var imageName = this.getImage(this.isRightAnswer);
        var imageAnswer = this.game.add.image(0,200, imageName);
        imageAnswer.alignTo(imageQuestion,Phaser.BOTTOM_CENTER);
        return imageAnswer;
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
    showButtonNext:function(imageAnswer){
        var buttonNext = this.game.add.button(0,0, 'button', this.onNextButtonClicked, this, 2, 1, 0);
        buttonNext.alignTo(imageAnswer, Phaser.BOTTOM_CENTER, 0);
        return buttonNext;
    },
    getImage:function(isRightAnswer){ 
        if(isRightAnswer){
            return 'right';
        }
        return 'wrong';
    },
    onNextButtonClicked:function(){
        this.currentQuestionIndex++;
        if(this.currentQuestionIndex < this.listQuestionsByCategory(this.categoryIndexSelected).length){
            this.game.state.start('question',true,false,this.categoryIndexSelected,this.currentQuestionIndex,this.remainingLives,this.score);
        }else{
            var isWin = true;
            this.game.state.start('endgame',true,false,isWin);
        }
        
    },
    listQuestionsByCategory:function(categoryIndex){
        return this.data.categories[categoryIndex].questions;
    }
}