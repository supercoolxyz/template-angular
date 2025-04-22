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

// The Vehicle class represents a vehicle unit in the game, which can follow waypoints and has health and speed properties.
// It extends the Unit class to inherit its properties and methods.
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

    // Update the vehicle's position and angle based on its speed and target waypoint
    update(dt: number): void {
        if (!this.targetWaypoint) {
            console.log("No target waypoint set.");
            return;
        }

        // Calculate the direction vector to the target waypoint
        const direction = this.targetWaypoint.position.subtract(this.position);

        // Calculate the angle to the target waypoint
        const targetAngle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);

        // Gradually adjust the angle to face the target waypoint
        const angleDifference = targetAngle - this.angle;
        this.angle += angleDifference * 0.1; // Smooth rotation factor (adjust as needed)

        // Normalize the direction vector
        const normalizedDirection = direction.normalize();

        // Update the position based on speed, direction, and delta time
        const dx = normalizedDirection.x * this.speed * dt;
        const dy = normalizedDirection.y * this.speed * dt;
        this.position = this.position.add(new Vec2(dx, dy));

        // Check if the vehicle has reached the target waypoint
        if (this.position.distanceTo(this.targetWaypoint.position) < this.speed * dt) {
            console.log(`Reached waypoint: ${this.targetWaypoint.toString()}`);
            this.position = this.targetWaypoint.position; // Snap to the waypoint
            this.targetWaypoint = this.getNextWaypoint(); // Move to the next waypoint
        }
    }

    // Set the target waypoint
    setTargetWaypoint(waypoint: Waypoint): void {
        this.targetWaypoint = waypoint;
    }

    // Get the next waypoint in the list
    private getNextWaypoint(): Waypoint | undefined {
        const currentIndex = this.waypoints.indexOf(this.targetWaypoint!);
        return this.waypoints[currentIndex + 1];
    }
}

// The Tower class represents a tower unit in the game, which can attack enemy units within its range.
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


// The Enemy class represents an enemy unit in the game, which can take damage and has health properties.
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
