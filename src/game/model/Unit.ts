import { Vec2 } from "./Vec2";
import { Waypoint } from "./Waypoint";

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

export class Vehicle extends Unit {
    private targetWaypoint?: Waypoint; // Optional property to track the current waypoint

    constructor(
        position: Vec2,
        angle: number,
        public waypoints: Waypoint[], // Array of waypoints for the vehicle to follow
        public health: number, // Health of the vehicle
        public speed: number // Speed of the vehicle
    ) {
        super(position, angle); // Call the parent constructor
    }

    // Accelerate the vehicle by a certain amount
    accelerate(amount: number): void {
        this.speed += amount;
    }

    // Decelerate the vehicle by a certain amount
    decelerate(amount: number): void {
        this.speed -= amount;
    }

    addDamage(damage: number): void {
        this.health -= damage;
    }

    getHealth(): number {
        return this.health;
    }

    // Update the vehicle's position based on its speed and angle
    update(dt: number): void {
        const radians = (this.angle * Math.PI) / 180;
        const dx = Math.cos(radians) * this.speed * dt;
        const dy = Math.sin(radians) * this.speed * dt;
        this.position = this.position.add(new Vec2(dx, dy));
    }
}

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
}

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
