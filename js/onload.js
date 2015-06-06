//
// Точка входа.
//
$(document).ready(function() {

    Game.init({
        startLevel: 1,
        level: [
            {
                numLevel: 1,
                timer: 20,
                wormSpeed: 300,
                
            },
          /*  {
                numLevel: 2,
                timer: 20,
                wormSpeed: 200,
                
            },
            {
                numLevel: 3,
                timer: 20,
                wormSpeed: 150
  
            }*/
        ],
        attrClassFoods: [
            'lime',
            'grape',
            'pear',
            'strawberry',
            'cherry',
            'orange'
        ],
        attrIdPlayField: '#matrix',
        attrClassCell: 'cell',
        attrClassWorm: 'worm',
        
        attrIdMessage: '#message',
        attrIdUsername: '#user',
        attrIdTimer: '#timer',
        attrIdScore: '#score',
        attrIdLevel: '#level',
        attrIdStart: '#start',
        attrIdGameOver: '#gameOver',
        rows: 20,
        cols: 20
    });

});
