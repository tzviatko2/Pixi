import { Button } from "./Button"; 
import { Game } from "./Game";
import {EventDispatcher} from "./EventDispatcher"

export class Button1 extends Button {
        constructor(label: string) {
        super(label);
    }
     protected init() {
        super.init();
     }
     protected onPointerUp() {
        super.onPointerUp();
        EventDispatcher.getInstance().getDispatcher().emit("changebtnup");
     }

     protected onPointerDown() {
        super.onPointerDown();
        EventDispatcher.getInstance().getDispatcher().emit("changebtndown");
     }
}