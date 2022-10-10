import * as PIXI from "pixi.js";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameObject } from "./GameObject";
import { GameApplication } from "./GameApplication";


export class BlueSquareBehavior extends GameObjectBehavior {

    private blueSquare: PIXI.Sprite;
    private velocity = 10;
    //

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    
    protected init() {
        this.createBlueSquare(); 
        
    }

        
    public createBlueSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.blueSquare = new PIXI.Sprite(texture);
        
        this.gameObjRef.addChild(this.blueSquare);
    }
 
    public update(delta: number) {
              
        if(GameObject.wasIt && this.gameObjRef.y + this.gameObjRef.height + this.velocity * delta < GameApplication.getApp().view.height) {
            this.gameObjRef.y += this.velocity * delta;        
                
        } else {
            this.gameObjRef.y = GameApplication.getApp().view.height - this.gameObjRef.height
        } 
       
    }
    
}