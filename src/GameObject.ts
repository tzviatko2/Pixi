import * as PIXI from "pixi.js";
import { GameObjectBehavior } from "./GameObjectBehavior"

export class GameObject extends PIXI.Container {

    private id: string;
    private behaviors: Map<string, GameObjectBehavior>;
    public static wasIt = false;
    
    constructor (id: string) {        
        super();
        this.id = id;        
        this.init();
    }


    private init() {
        this.behaviors = new Map<string, GameObjectBehavior>();

    }
    public getId(): string {
        return this.id;
    }
    
    public update (delta: number) {
        this.behaviors.forEach((behavior) => {
            behavior.update(delta);
        });
    }

    public addBehavior(id: string, behavior: GameObjectBehavior) {
        this.behaviors.set(id, behavior);
    }

    public removeBehavior(id: string) {
        if(!this.behaviors.has(id)) {
            return;
        }
        this.behaviors.get(id).destroy();
        this.behaviors.delete(id);
    } 
}