

// The Enemy class represents an enemy unit in the game, which can take damage and has health properties.

import { Unit } from "./Unit";
import { Vec2 } from "./Vec2";


// The EnemyConfig class represents the configuration for an enemy, including its initial stats and increments per level.
// It can be used to create different types of enemies with varying stats.
export class EnemyConfig {
    constructor(
        public initialHealth: number, // Initial health of the enemy
        public healthIncrement: number // Health increment per level
    ) {}
}

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
