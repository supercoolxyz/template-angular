import { Waypoint } from "./Waypoint";

export class Waypoints {
    waypoints: Waypoint[] = [];

    constructor() {}

    addWaypoint(x: number, y: number, label?: string): void {
        const waypoint = new Waypoint(x, y, label);
        this.waypoints.push(waypoint);
    }

    getWaypoints(): Waypoint[] {
        return this.waypoints;
    }

    getWaypoint(index: number): Waypoint | undefined {
        return this.waypoints[index];
    }

    clearWaypoints(): void {
        this.waypoints = [];
    }
}
