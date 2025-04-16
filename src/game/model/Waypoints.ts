import { Waypoint } from "./Waypoint";
import { Vec2 } from "./Vec2";

export class Waypoints {
    waypoints: Waypoint[] = [];

    constructor() {}

    // Add a waypoint using a Vec2 for position
    addWaypoint(position: Vec2, label?: string): void {
        const waypoint = new Waypoint(position, label);
        this.waypoints.push(waypoint);
    }

    // Get all waypoints
    getWaypoints(): Waypoint[] {
        return this.waypoints;
    }

    // Get a specific waypoint by index
    getWaypoint(index: number): Waypoint | undefined {
        return this.waypoints[index];
    }

    // Clear all waypoints
    clearWaypoints(): void {
        this.waypoints = [];
    }
}
