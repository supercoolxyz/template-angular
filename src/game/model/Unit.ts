import { Vec2 } from "./Vec2";
import { Waypoint } from "./Waypoint";

// The Unit class represents a generic unit in the game, which can be a vehicle, tower, or enemy.
export class Unit {
    constructor(
        public position: Vec2, // Position of the unit as a Vec2
        public angle: number // Angle of the unit in degrees
    ) {}

    // Move the unit to a new position
    moveTo(newPosition: Vec2): void {
        this.position = newPosition;
    }

    // Rotate the unit to a new angle
    rotateTo(newAngle: number): void {
        this.angle = newAngle;
    }

    // Get the unit's position as a string
    toString(): string {
        return `Unit at ${this.position.toString()} facing ${this.angle}°`;
    }
}


