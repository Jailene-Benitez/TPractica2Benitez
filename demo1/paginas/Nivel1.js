class Nivel1 extends Phaser.Scene{
    suelos;
    gato;
    preload(){
       // this.load.setBaseURL('http://127.0.0.1:5500/');//Define la ruta base del proyecto
        this.load.image('fondo','.//resources/fondo.jpg');//agrega un fondo al nivel
        //carga assets del suelos
        this.load.image('suelo','.//resources/plataformacarbon.png');
        //******Player*******
        this.load.image("player",".//resources/playergato.png"); 
        this.load.image("piso",".//resources/piso.png"); 
    }
    create(){
        this.add.image(250,250,'fondo');
        this.suelos = this.physics.add.staticGroup(); 
        this.suelos.create(250,480,'suelo').setScale(0.5).refreshBody();
        this.suelos.create (90, 380, 'suelo').setScale(0.4,0.4).refreshBody();
        this.suelos.create(390, 300, 'suelo').setScale(0.4, 0.4).refreshBody();

        this.gato = this.physics.add.sprite(250,300,'player');
        this.gato.setBounce(0.2);
        this.gato.setCollideWorldBounds(true);
        this.physics.add.collider(this.gato,this.suelos);
        this.cursor=this.input.keyboard.createCursorKeys();
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.isJumping = false;
        this.walls = this.physics.add.staticGroup();
    }
    
    update(){
        if(this.cursor.left.isDown){
            this.gato.setVelocityX(-160);
        }
        else if (this.cursor.right.isDown) {
            this.gato.setVelocityX(160);
        }
        else {
            this.gato.setVelocityX(0);
        }
        if (this.cursor.up.isDown && this.canJump) {
            this.gato.setVelocityY(-200);
            this.canJump = false;
        }
        if (this.cursor.up.isUp && !this.gato.body.touching.down) {
            this.canJump = true;    
        }
    }
}