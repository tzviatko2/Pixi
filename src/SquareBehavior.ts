import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameObject } from "./GameObject";
import * as PIXI from "pixi.js";
import { GameApplication } from "./GameApplication";

export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity = 10;
    private ballObjRef: GameObject;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public destroy() {
        this.square.destroy({texture: true, baseTexture: true});
        this.gameObjRef.removeChild(this.square);
    }

    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }

    protected init() {
        this.createBall(); 
    }

    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }
 
    private move(delta: number) {
        this.gameObjRef.x += this.velocity * delta;
    }
    
    public update(delta: number) {
        // if(this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
        //     this.gameObjRef.x += this.velocity * delta;
        // } else {
        //     this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width
        // }
                 
        if(! GameObject.wasIt && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
            this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
                GameObject.wasIt = true;                
            }
        if(GameObject.wasIt && this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
            GameObject.wasIt;
            this.move(delta);
        } 
        if(GameObject.wasIt) {
            this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width
        }
    }
}