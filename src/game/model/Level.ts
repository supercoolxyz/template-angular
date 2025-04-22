
import { Vehicle } from "./Unit";

import { Tower } from "./Unit";
import { Waypoint } from "./Waypoint";

import { Grid } from "./Grid";
import { GridConfig } from "./config";

// The Level class represents a game level, which contains vehicles, towers, waypoints, and a grid for managing tower placement.
// It provides methods to add vehicles, towers, and waypoints, update vehicles, command towers to attack, and get a summary of the level.
export class Level {
    public vehicles: Vehicle[] = []; // Array to store vehicles
    public towers: Tower[] = []; // Array to store towers
    public waypoints: Waypoint[] = []; // Array to store waypoints
    public grid: Grid; // Grid for managing tower placement

    constructor(public name: string, gridConfig: GridConfig) {
        this.grid = new Grid(gridConfig);
    }

    // Add a vehicle to the level
    addVehicle(vehicle: Vehicle): void {
        this.vehicles.push(vehicle);
    }

    // Add a waypoint to the level
    addWaypoint(waypoint: Waypoint): void {
        this.waypoints.push(waypoint);
    }

    // Place a tower in the grid
    placeTower(row: number, col: number, tower: Tower): boolean {
        const success = this.grid.placeTower(row, col, tower);
        if (success) {
            this.towers.push(tower);
        }
        return success;
    }

    // Remove a tower from the grid
    removeTower(row: number, col: number): boolean {
        const tower = this.grid.getTower(row, col);
        if (tower) {
            this.towers = this.towers.filter(t => t !== tower); // Remove from the towers array
        }
        return this.grid.removeTower(row, col);
    }

    // Update all vehicles in the level
    updateVehicles(dt: number): void {
        for (const vehicle of this.vehicles) {
            vehicle.update(dt);
        }
    }

    // Command all towers to attack a specific target
    commandTowersToAttack(target: Vehicle): void {
        for (const tower of this.towers) {
            tower.attack(target);
        }
    }

    // Get a summary of the level
    getSummary(): string {
        return `Level: ${this.name}\n` +
            `Vehicles: ${this.vehicles.length}\n` +
            `Towers: ${this.towers.length}\n` +
            `Waypoints: ${this.waypoints.length}`;
    }
}