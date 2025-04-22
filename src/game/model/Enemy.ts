

// The Enemy class represents an enemy unit in the game, which can take damage and has health properties.

import { Unit } from "./Unit";
import { Vec2 } from "./Vec2";

// It extends the Unit class to inherit its properties and methods.
export class Enemy extends Unit {
    constructor(
        position: Vec2,
        angle: number,
        public health: number // Health of the enemy
    ) {
        super(position, angle); // Call the parent constructor
    }

    // Take damage from an attack
    takeDamage(damage: number): void {
        this.health -= damage;
    }

    // Check if the enemy is alive
    isAlive(): boolean {
        return this.health > 0;
    }
}
