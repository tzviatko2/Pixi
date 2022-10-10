import * as PIXI from "pixi.js";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameObject } from "./GameObject";
import { GameApplication } from "./GameApplication";


export class BallBehavior extends GameObjectBehavior {

    private ball: PIXI.Sprite;
    private velocity = 10;
    private keyPressed = false;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public destroy() {
        this.ball.destroy({texture: true, baseTexture: true});
        this.gameObjRef.removeChild(this.ball);
    }

    protected init() {
        this.createBall(); 
        this.setKeyCallBackEvent();
    }

    private setKeyCallBackEvent() {
        this.onKeyUp = this.onKeyUp.bind(this);
        window.addEventListener("keyup", this.onKeyUp);
    }
    
    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawCircle(0, 0, 20);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);
        
        this.gameObjRef.addChild(this.ball);
    }
 
    public update(delta: number) {
        
        if(!this.keyPressed) {
            return;
        }

        if(! GameObject.wasIt && this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
            this.gameObjRef.x += this.velocity * delta;        
                
        } 
        // else {
        //     this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width
        // }
    }
    private onKeyUp(e: any) {
        if(e.code === "Space") {
            this.keyPressed = true;           
        }
    }
}