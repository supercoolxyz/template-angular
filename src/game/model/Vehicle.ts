
// The Vehicle class represents a vehicle unit in the game, which can follow waypoints and has health and speed properties.

import { Vec2 } from "./Vec2";
import { Waypoint } from "./Waypoint";
import { Unit } from "./Unit";

// The VehicleConfig class represents the configuration for a vehicle, including its initial stats and increments per level.
// It can be used to create different types of vehicles with varying stats.
export class VehicleConfig {
    constructor(
        public initialHealth: number, // Initial health of the vehicle
        public initialSpeed: number, // Initial speed of the vehicle
        public speedIncrement: number // Speed increment per level
    ) {}
}

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