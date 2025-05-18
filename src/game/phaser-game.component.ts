import { Component, Input, OnInit } from "@angular/core";
import Phaser from "phaser";
import StartGame from "./main";
import { EventBus } from "./EventBus";

@Component({
    selector: 'phaser-game',
    template: '<div id="game-container"></div>',
    standalone: true,
})
export class PhaserGame implements OnInit
{

    scene: Phaser.Scene;
    game: Phaser.Game;

    sceneCallback: (scene: Phaser.Scene) => void;

    private resizeGameWindow(width: number, height: number): void {
        debugger;
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.style.width = `${width}px`;
            gameContainer.style.height = `${height}px`;
        }

        this.game.scale.resize(width, height);
        this.game.scale.refresh();
    }


    ngOnInit()
    {
        this.game = StartGame('game-container');

        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {

            
            window.onresize = (): any => {
                this.resizeGameWindow(window.innerWidth, window.innerHeight);
            };
 
            this.resizeGameWindow(window.innerWidth, window.innerHeight);
            
            this.scene = scene;

            if (this.sceneCallback)
            {

                this.sceneCallback(scene);

            }

        });
    }

    // Component unmounted
    ngOnDestroy()
    {

        if (this.game)
        {

            this.game.destroy(true);

        }
    }
}
