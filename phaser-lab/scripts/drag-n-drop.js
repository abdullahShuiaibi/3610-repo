class DragAndDropScene extends Phaser.Scene
{
    constructor()
    {
        super('DragAndDropScene');
    }

    preload()
    {
        this.load.image('background', 'assets/images/background.jpeg');
        this.load.image('bluefish', 'assets/sprites/bluefish.png');
        this.load.image('submarine', 'assets/sprites/submarine.jpeg');
        this.load.image('yellowfish', 'assets/sprites/yellowfish.jpeg');
    }

    create()
    {


        let bluefish = this.physics.add.sprite(500, 450, 'bluefish');
        bluefish.setScale(0.5);
        bluefish.setInteractive();
      

        let submarine = this.physics.add.sprite(250, 250, 'submarine');
        submarine.setInteractive();
      

        let yellowfish = this.physics.add.sprite(700, 300, 'yellowfish');
        yellowfish.setScale(0.2);
        yellowfish.setInteractive();
   

        this.input.on('pointerdown', this.onHold, this);
    }

    onHold(pointer, targets)
    {
        this.input.off('pointerdown', this.onHold, this);
        this.target = targets[0];
        this.input.on('pointermove', this.onDrag, this);
        this.input.on('pointerup', this.onLetGo, this);
    }

    onDrag(pointer)
    {
        if(typeof this.target != undefined)
        {
            this.target.x = pointer.x;
            this.target.y = pointer.y;
        }
    }

    onLetGo(pointer)
    {
        this.input.on('pointerdown', this.onHold, this);
        this.input.off('pointermove', this.onDrag, this);
        this.input.off('pointerup', this.onLetGo, this);
    }
}