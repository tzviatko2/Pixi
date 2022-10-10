import * as PIXI from "pixi.js";
import { GameObject } from "./GameObject"
import {BallBehavior} from "./BallBehavior"
import {Button1} from "./Button1"
import {Button2} from "./Button2"
import { GameApplication } from "./GameApplication"
import {SquareBehavior} from "./SquareBehavior"
import { EventDispatcher } from "./EventDispatcher";
import { ScoreView } from "./ScoreView";
import {Model} from "./Model";
import {BlueSquareBehavior} from "./BlueSquareBehavior"

export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;
    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;

    private changeBehaviorBtn: Button1;
    private initBehaviorBtn: Button2;    
    
    private scoreView: ScoreView;
    

    constructor () {
        super();
        this.init();
    }

    private init() {
        
        this.createTicker();
        this.createGameObjList();
        this.createGameObjectContainer();
        this.createUIConteiner();
        this.createButton();
        this.createGameObj();
        this.createScoreView();
        
    }

    private createScoreView() {
        this.scoreView = new ScoreView(0);
        this.scoreView.x = 50;
        this.scoreView.y = 10;
        this.uiContainer.addChild(this.scoreView);
    }

    
    private createGameObjList() {
        this.gameObjects = new Map<string, GameObject>();
    }

    private createGameObjectContainer() {
        this.gameObjectContainer = new PIXI.Container();
        this.addChild(this.gameObjectContainer);
    }

    private createUIConteiner() {
        this.uiContainer = new PIXI.Container();
        this.addChild(this.uiContainer);
    }

    private createButton() {
        this.changeBehaviorBtn = new Button1("Change behavior");
        this.changeBehaviorBtn.x = 400;
        this.changeBehaviorBtn.y = GameApplication.getApp().view.height -this.changeBehaviorBtn.height - 10;
        EventDispatcher.getInstance().getDispatcher().addListener("changebtnup", this.onChangeBtnUp, this);
        this.uiContainer.addChild(this.changeBehaviorBtn);

        this.initBehaviorBtn = new Button2("Init behavior");
        this.initBehaviorBtn.x = 100;
        this.initBehaviorBtn.y = GameApplication.getApp().view.height -this.initBehaviorBtn.height - 10;
        EventDispatcher.getInstance().getDispatcher().addListener("initbtnup", this.onInitBtnUp, this);
        this.uiContainer.addChild(this.initBehaviorBtn);
    }

    private createTicker() {
        this.ticker = new PIXI.Ticker;
        this.ticker.add(this.update, this);
        this.ticker.start();
    }
    private createGameObj() {
        this.createBallGameObj();
        this.createSquareGameObj();
        
    }

    private createBallGameObj() {
        const ballGameObj: GameObject = new GameObject("gameObj1");
                
        ballGameObj.x = 100;
        ballGameObj.y = 100;
        this.addGameObject(ballGameObj)
        
        const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
        ballGameObj.addBehavior("ballBehavior", ballBehavior);
    }

    private createSquareGameObj() {
        const squareGameObj: GameObject = new GameObject("gameObj2");
        
        squareGameObj.x = 500;
        squareGameObj.y = 75;
        this.addGameObject(squareGameObj)
        
        const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
        squareBehavior.setSquareObjRef(this.getGameObjById("gameObj1"));
        squareGameObj.addBehavior("squareBehavior", squareBehavior);

        EventDispatcher.getInstance().getDispatcher().addListener("updatescore", this.onScoreUpdate, this);
        EventDispatcher.getInstance().getDispatcher().addListener("createBlueSquare", this.onCreateBlueSquare, this);
    }
 
    private createBlueSquareGameObj() {
        const blueSquareGameObj: GameObject = new GameObject("gameObj3");
        
        blueSquareGameObj.x = 500;
        blueSquareGameObj.y = 75;
        this.addGameObject(blueSquareGameObj)
        
        const blueSquareBehavior: BlueSquareBehavior = new BlueSquareBehavior(blueSquareGameObj);
        
        blueSquareGameObj.addBehavior("blueSquareBehavior", blueSquareBehavior);

        
    }
    
    private onCreateBlueSquare() {
        this.createBlueSquareGameObj();
        const gameObj: GameObject = this.getGameObjById("gameObj3");
    if(!gameObj) {
        return
       }

       const blueSquareBehavior: BlueSquareBehavior = new BlueSquareBehavior(gameObj);        
        gameObj.addBehavior("blueSquareBehavior", blueSquareBehavior);    
    }

    private addGameObject(gameObj: GameObject) {
        this.gameObjectContainer.addChild(gameObj);
        this.gameObjects.set(gameObj.getId(), gameObj);
    }

    private update(delta: number) {
        this.gameObjects.forEach(gameObj => {
        gameObj.update(delta);
        });
    }

private getGameObjById(id:string): GameObject {
    if(!this.gameObjects.has(id)) {
        return null;
    } 
    return this.gameObjects.get(id);
    
}

private onInitBtnUp () {
   
}

private onChangeBtnUp () {
    const gameObj: GameObject = this.getGameObjById("gameObj1");
    if(!gameObj) {
        return
       }

       gameObj.removeBehavior("squareBehavior");
       const ballBehavior: BallBehavior = new BallBehavior(gameObj);
       gameObj.addBehavior("ballBehavior", ballBehavior);
}

    private onScoreUpdate() {
        const currentScore: number = Model.getInstance().getScore() + 1;
        Model.getInstance().setScore(currentScore);
        this.scoreView.setScore(Model.getInstance().getScore());
    }
}