
// The Tower class represents a tower unit in the game, which can attack enemy units within its range.

import { Unit } from "./Unit";
import { Vec2 } from "./Vec2";
import { Vehicle } from "./Vehicle";

// It extends the Unit class to inherit its properties and methods.
export class Tower extends Unit {
    private level: number = 1; // Level of the tower
    private targetUnit?: Unit; // Optional property to track the current target unit

    constructor(
        position: Vec2,
        angle: number,
        public range: number, // Range of the tower
        public damage: number // Damage of the tower
    ) {
        super(position, angle); // Call the parent constructor
    }

    // Attack a target unit if it's within range
    attack(target: Unit): void {
        const distance = this.position.distanceTo(target.position);
        if (distance <= this.range) {
            console.log(`Attacking target at ${target.position.toString()}`);
            (target as Vehicle).addDamage(this.damage);
        } else {
            console.log(`Target out of range!`);
        }
    }

    // Level up the tower to increase its stats
    levelUp(): void {
        this.level++;
        this.range += 10; // Increase range by 10 units per level
        this.damage += 5; // Increase damage by 5 units per level
        console.log(
            `Tower leveled up to Level ${this.level}. New Range: ${this.range}, New Damage: ${this.damage}`
        );
    }

    // Get the current level of the tower
    getLevel(): number {
        return this.level;
    }
}

