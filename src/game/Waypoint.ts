export class Waypoint {
    public connections: Waypoint[] = []; // Array to store connected waypoints

    constructor(
        public x: number,
        public y: number,
        public label?: string // Optional label for the waypoint
    ) {}

    // Calculate the distance to another waypoint
    distanceTo(other: Waypoint): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
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
        return this.label ? `${this.label} (${this.x}, ${this.y})` : `(${this.x}, ${this.y})`;
    }
}
