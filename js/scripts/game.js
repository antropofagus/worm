function Game() {

    var game = this;
    game.m1 = null;
    game.food = null;
    game.worm = null;
   
    game.intScore = 0;
    game.intTimer = 0;
    game.level = null;
    game.wormId;
   


    this.initLevel = function(numLevel) {

        game.level = level[numLevel-1];

        game.m1 = new Matrix(attrIdPlayField, rows, cols);
        game.m1.create();

        game.worm = new Worm();
       

        game.food = new Food();
        game.setFood();

        game.intTimer = game.level.timer;
        $(attrIdLevel).text(game.level.numLevel);

        $(attrIdStart).click(function() {
            game.start();
            $(attrIdMessage).hide('explode', 500);
            $(attrIdMessage+' '+attrIdStart).hide().html('');
        });

        $(attrIdGameOver).click(function() {
            $(attrIdMessage).hide('explode', 500);
            location.reload();
        });
    };


    this.nextLevel = function() {

        clearInterval(game.timeId);
        clearInterval(game.wormId);
       
        game.m1.clear();
        game.m1.destruct();
        game.food.destruct();
        game.worm.destruct();
       

        $(attrIdStart).unbind('click');

        var level = ++game.level.numLevel;

        if (false !== $.isEmptyObject(level[level-1]) &&
            0 < game.intScore
        ){
            game.passed();
        }

        game.initLevel(level);
        game.popupMessage(attrIdStart, 'Next level: '+ game.level.numLevel);
    };


    this.start = function() {

        $(document).keydown(function(e) {

            var controlKeys = {left:37, up:38, right:39, down:40};

            var course = helpers.find(e.keyCode, controlKeys);

            if(false !== course && false === game.isBackUp(course))
                game.worm.course = course;

        });

        game.timeId = setInterval(function() {
            if ( 0 == game.intTimer ) {
                clearInterval(game.timeId);
                game.nextLevel();
            }
            $(attrIdTimer).text(--game.intTimer);
        }, 1000);

        game.wormId = setInterval(function() {
            if ( false === game.play() ) {
                game.end();
            }
        }, game.level.wormSpeed);
    };




    this.play = function() {

        game.setCoordinate(game.worm);

        if (false !== game.offside(game.worm.head.coordinate.x, game.worm.head.coordinate.y) ||
            false !== this.isPlayer(game.worm.head.coordinate.x, game.worm.head.coordinate.y)
        ){
            return false;
        }

        if ( false === this.isFood() ) {

            var tailEnd = game.worm.body.pop();
            game.m1.setCell(tailEnd.coordinate.x,
                tailEnd.coordinate.y,
                attrClassWorm,
                false
            );
        } else {
            $(attrIdScore).text(++game.intScore);
            game.setFood();
        }

        game.move();
        return true;
    };


    this.move = function() {

        game.worm.body.unshift( new Point(game.worm.head.coordinate.x, game.worm.head.coordinate.y) );
        game.m1.setCell(game.worm.head.coordinate.x,
            game.worm.head.coordinate.y,
            attrClassWorm,
            true
        );
    };


    this.isBackUp = function(course) {
        return course == 'right' && game.worm.course == 'left' ||
            course == 'up' && game.worm.course == 'down' ||
            game.worm.course == 'right' && course == 'left' ||
            game.worm.course == 'up' && course == 'down'
        ;
    };


    this.setCoordinate = function(obj) {

        if ( obj.course == 'left' )
            obj.head.coordinate.y--;
        else if ( obj.course == 'up' )
            obj.head.coordinate.x--;
        else if ( obj.course == 'right' )
            obj.head.coordinate.y++;
        else if ( obj.course == 'down' )
            obj.head.coordinate.x++;

    };


    this.offside = function(x, y) {
        return x === 0 || x === game.m1.cols+1 ||
            y === 0 || y === game.m1.cols+1;
    };


    this.passed = function() {
        clearInterval(game.timeId);
        clearInterval(game.wormId);
        html = "Win!<br> Your Score: "+ game.intScore;
        game.popupMessage(attrIdMessage, html);
    };


    this.end = function() {

        clearInterval(game.timeId);
        clearInterval(game.wormId);
        game.popupMessage(attrIdGameOver, 'Game Over');
    };


    this.isPlayer = function(x, y) {
        return game.m1.getCell(x, y, attrClassWorm);
    };


    this.isFood = function() {
        return game.m1.getCell(game.worm.head.coordinate.x,
            game.worm.head.coordinate.y,
            game.food.fruit
        );
    };


    this.setFood = function() {

        game.m1.setCell(game.food.position.coordinate.x,
            game.food.position.coordinate.y,
            game.food.fruit,
            false
        );
        game.food = new Food();
        game.m1.setCell(game.food.position.coordinate.x,
            game.food.position.coordinate.y,
            game.food.fruit,
            true
        );

        if ( false !== this.isFood() ) {
            game.setFood();
        }
    };


    this.popupMessage = function(selector, message) {
        $(attrIdMessage+' '+selector)
            .show()
            .html(message)
        ;
        $(attrIdMessage).show('explode', 500);
    }
}


var attrIdPlayField = '#matrix';
var attrClassCell = 'cell';
var attrClassWorm = 'worm';

var attrIdMessage = '#message';
var attrIdTimer = '#timer';
var attrIdScore = '#score';
var attrIdLevel = '#level';
var attrIdStart = '#start';
var attrIdGameOver = '#gameOver';
var rows = 20;
var cols = 20;
var attrClassFoods = [
   'lime',
    'grape',
    'pear',
    'strawberry',
    'cherry',
    'orange'
];
var level = [
    {
        numLevel: 1,
        timer: 20,
        wormSpeed: 300
  
    },
    {
        numLevel: 2,
        timer: 20,
        wormSpeed: 200
  
    },
    {
        numLevel: 3,
        timer: 20,
        wormSpeed: 150
  
    }
];
var startLevel = 1;

Game.init = function(options) {

    attrIdPlayField = options.attrIdPlayField || attrIdPlayField;
    
    attrIdGameOver = options.attrIdGameOver || attrIdGameOver;
    attrClassFoods = options.attrClassFoods || attrClassFoods;
    attrIdMessage = options.attrIdMessage || attrIdMessage;
    attrClassCell = options.attrClassCell || attrClassCell;
    attrClassWorm = options.attrClassWorm || attrClassWorm;
    attrIdTimer = options.attrIdTimer || attrIdTimer;
    attrIdScore = options.attrIdScore || attrIdScore;
    attrIdLevel = options.attrIdLevel || attrIdLevel;
    attrIdStart = options.attrIdStart || attrIdStart;
    startLevel = options.startLevel || startLevel;
    rows = options.rows || rows;
    cols = options.cols || cols;
    level = options.level || level;

    $(attrIdMessage).hide();

    $(attrIdPlayField)
        .click(function() {
            game.popupMessage(attrIdStart, 'Click start');
        })
    ;

    $( ".column" ).sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all",
        cursor: "move"
    });

    $( ".portlet" )
        .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
        .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

    $( ".portlet-toggle" ).click(function() {
        var icon = $( this );
        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
        icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });

    var game = new Game();
    game.initLevel(startLevel);
};