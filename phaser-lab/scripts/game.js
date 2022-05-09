document.addEventListener('DOMContentLoaded', init)

var game;

let config = {
    type: Phaser.AUTO,
    backgroundColor: '#73BAD4',
    parent: 'canvas-container',
    width: 1024,
    height: 768,
    scene: [DragAndDropScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

function init()
{
    game = new Phaser.Game(config);
}