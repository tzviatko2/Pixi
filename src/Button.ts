import * as PIXI from "pixi.js";
import { GameApplication } from "./GameApplication";

export class Button extends PIXI.Container {
    //private static btn: number;
    private background: PIXI.Sprite;
    private text: PIXI.Text;
    private label: string;
    
    constructor(label: string) {
        super();
        this.label = label;
        this.init();
    }
    
    protected init() {
        
        this.createBackground();
        this.interactive = true;
        this.onPointerDown = this.onPointerDown.bind(this);
        this.setInteractiveCallbacks();
        this.createText();
    }
    private setInteractiveCallbacks() {
        this.addListener("pointerdown", this.onPointerDown);
        this.addListener("pointerup", this.onPointerUp);
    }
    private createBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff);
        gfx.drawRoundedRect(0, 0, 200, 40, 40);
        gfx.endFill();
        const textute: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.background = new PIXI.Sprite(textute);
        this.addChild(this.background);
    }
    private createText() {
        this.text = new PIXI.Text(this.label, {
            fontFamily: "Minecraft",
            fontSize: 20,
            fill: 0xffff00,
        });
        this.text.anchor.set(0.5);
        this.text.x = this.background.width / 2;
        this.text.y = this.background.height / 2;
        this.addChild(this.text);
    }
    protected onPointerDown() {
        this.background.tint = 0xff0000;
    }
    protected onPointerUp() {
        this.background.tint = 0xffffff;
    }
}
