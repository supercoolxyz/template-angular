import { Vec2 } from "./Vec2";

export class Waypoint {
    public connections: Waypoint[] = []; // Array to store connected waypoints

    constructor(
        public position: Vec2, // Position of the waypoint as a Vec2
        public label?: string // Optional label for the waypoint
    ) {}

    // Calculate the distance to another waypoint
    distanceTo(other: Waypoint): number {
        return this.position.distanceTo(other.position);
    }

    // Add a connection to another waypoint
    addConnection(waypoint: Waypoint): void {
        if (!this.connections.includes(waypoint)) {
            this.connections.push(waypoint);
        }
    }

    // Remove a connection to another waypoint
    removeConnection(waypoint: Waypoint): void {
        this.connections = this.connections.filter(wp => wp !== waypoint);
    }

    // Convert the waypoint to a string representation
    toString(): string {
        return this.label
            ? `${this.label} ${this.position.toString()}`
            : this.position.toString();
    }
}
