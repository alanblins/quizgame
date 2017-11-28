module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    wiredep: {

      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'www-root/index.html',   // .html support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('generate-pack-json', 'Generate Asset Pack', function(arg1, arg2) {
      var fs = require('fs');
      var questions_json_file = JSON.parse(fs.readFileSync('www-root/data/questions.json', 'utf8'));


      var images_questions = [];
      for(var category_index in questions_json_file.categories){
        for(var index in questions_json_file.categories[category_index].questions){

          var image_name = questions_json_file.categories[category_index].questions[index].image;

          var itemAssetJson  = {};
          itemAssetJson.type = "image";
          itemAssetJson.key  = "image_question_"+category_index+'_'+index;
          itemAssetJson.url  = "assets/images_questions/"+image_name;

          images_questions.push(itemAssetJson);

          var answer_image = questions_json_file.categories[category_index].questions[index].answer_image;

          itemAssetJson  = {};
          itemAssetJson.type = "image";
          itemAssetJson.key  = "image_answer_"+category_index+'_'+index;
          itemAssetJson.url  = "assets/images_questions/"+answer_image;

          images_questions.push(itemAssetJson);
        }
      }

      var jsonPack = { 
        images_questions:images_questions,
          "meta": {
              "generated": "1401380327373",
              "app": "Phaser Asset Packer",
              "url": "http://phaser.io",
              "version": "1.0",
              "copyright": "Photon Storm Ltd. 2014"
          }
      };
      
      fs.writeFileSync('www-root/assets/images-pack.json', JSON.stringify(jsonPack,null,4) );
  });

};