import { Waypoints } from "./Waypoints";
import { Waypoint } from "./Waypoint";


export class Path {
    constructor(
        private waypoints: Waypoints,           // Reference to the Waypoints collection
        public indices: number[]                // Indices of waypoints forming the path
    ) {}

    // Get the Waypoint objects for this path
    getWaypoints(): Waypoint[] {
        return this.indices
            .map(index => this.waypoints.getWaypoint(index))
            .filter((wp): wp is Waypoint => wp !== undefined);
    }

    // Get the next waypoint index in the path, given the current index in the path
    getNextIndex(currentPathIndex: number): number | null {
        if (currentPathIndex + 1 < this.indices.length) {
            return this.indices[currentPathIndex + 1];
        }
        return null;
    }

    // Get the next Waypoint in the path, given the current index in the path
    getNextWaypoint(currentPathIndex: number): Waypoint | null {
        const nextIdx = this.getNextIndex(currentPathIndex);
        return nextIdx !== null ? this.waypoints.getWaypoint(nextIdx) ?? null : null;
    }
}
