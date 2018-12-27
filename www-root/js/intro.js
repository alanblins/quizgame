var QuizGame = QuizGame || {};

QuizGame.Intro = function () {
}

QuizGame.Intro.prototype = {
    preload: function () {
    },
    create: function () {
        var rectCanvas = QuizGame.Utils.getRectCanvas();
        var data = this.game.cache.getJSON('questions');
        this.remainingLives = data.lives;
        var intoGroup = this.game.add.group();
        var buttonsGroup = this.createButtons();
        var textGroup = this.createTextHeaders();
        buttonsGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        intoGroup.add(buttonsGroup)
        intoGroup.add(textGroup)
        intoGroup.alignIn(rectCanvas,Phaser.CENTER);
    },
    createButtons:function(){
        this.previousButton = null;
        this.groupButtons = this.game.add.group();
        this.createButtonCategory(0);
        this.createButtonCategory(1);
        this.createButtonCategory(2);
        return this.groupButtons;
    },
    createButtonCategory: function (index) {
        var key = 'buttonCategory_' + (index + 1);
        var context = { category: index, game:this.game,remainingLives:this.remainingLives};
        var button = this.game.add.button(0, 0, key, this.onButtonCategoryClicked, context, 2, 1, 0);
        if (this.previousButton) {
            button.alignTo(this.previousButton, Phaser.RIGHT_CENTER, 16);
        }
        this.previousButton = button;
        this.groupButtons.add(button);
    },
    onButtonCategoryClicked: function () {
        this.game.state.start('question',true,false,this.category,0,this.remainingLives,0);
    },
    createTextHeaders:function(){
        var previous;
        var texts = ['Welcome on board!','Let\'s test your skills','Choose your age!'];
        var group = this.game.add.group();
        var that = this;
        texts.forEach( function(text){
            var textEl = that.createText(text);
            if(previous){
                textEl.alignTo(previous,Phaser.BOTTOM_CENTER);
            }
            previous = textEl;
            group.add(textEl);
        });
        return group;
    },
    createText:function(textContent){
        var style = this.getStyleCategory();
        style.font = 'Audiowide';
        style.fontSize = '38pt';
        style.backgroundColor = '#ffffff';
        style.fill= '#000000';
        return this.game.add.text(0,0,textContent, style);
    },
    getStyleCategory:function(){
        return { 
            font: "38pt Arial", fill: "#000000", wordWrap: false,  align: "left", backgroundColor:'#FFFFFF' };
    }
}