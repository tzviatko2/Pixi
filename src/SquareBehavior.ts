import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameObject } from "./GameObject";
import * as PIXI from "pixi.js";
import { GameApplication } from "./GameApplication";
import { EventDispatcher } from "./EventDispatcher";

export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity = 10;
    private squareObjRef: GameObject;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public destroy() {
        this.square.destroy({texture: true, baseTexture: true});
        this.gameObjRef.removeChild(this.square);
    }

    public setSquareObjRef(gameObj: GameObject) {
        this.squareObjRef = gameObj;
    }

    protected init() {
        this.createSquare(); 
    }

    

    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);
        
        this.gameObjRef.addChild(this.square);
    }
 
    private move(delta: number) {
        this.gameObjRef.y += this.velocity * delta;  
    }
    
    public update(delta: number) {
        
        //let wasIt: boolean = false;
        // if(!wasIt && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
        //     this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
        //         wasIt = true;   
        //         //this.gameObjRef.destroy();
        //         
        //         EventDispatcher.getInstance().getDispatcher().emit("updatescore");         
        //     }
        // if(wasIt) {
        //     this.move();
        // } 
        if(! GameObject.wasIt && this.squareObjRef.x + this.squareObjRef.width >= this.gameObjRef.x && this.squareObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
            this.squareObjRef.y + this.squareObjRef.height >= this.gameObjRef.y && this.squareObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
                GameObject.wasIt = true;        
                EventDispatcher.getInstance().getDispatcher().emit("createBlueSquare"); 
                EventDispatcher.getInstance().getDispatcher().emit("updatescore");
                this.gameObjRef.destroy();       
            }
        // if(GameObject.wasIt && this.gameObjRef.y + this.gameObjRef.height + this.velocity * delta < GameApplication.getApp().view.height) {
        //     //this.gameObjRef.destroy();
        //     EventDispatcher.getInstance().getDispatcher().emit("createBlueSquare");
        //     this.move(delta);
        //     //EventDispatcher.getInstance().getDispatcher().emit("updatescore");  
        // } 
        
        // if(GameObject.wasIt) {
        //     this.gameObjRef.y = GameApplication.getApp().view.height - this.gameObjRef.height
        // } 
    }
}