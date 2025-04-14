import { Waypoint } from '../../game/Waypoint';

export class Entity {
    pos: any;
    angle: any;
    currentWaypoint?: Waypoint; // Optional property to track the current waypoint

    constructor(pos: any, angle: any, currentWaypoint?: Waypoint) {
        this.pos = pos;
        this.angle = angle;
        this.currentWaypoint = currentWaypoint;
    }

    // Set the current waypoint
    setCurrentWaypoint(waypoint: Waypoint): void {
        this.currentWaypoint = waypoint;
    }

    // Get the current waypoint as a string
    getCurrentWaypoint(): string {
        return this.currentWaypoint
            ? this.currentWaypoint.toString()
            : 'No current waypoint';
    }
}

