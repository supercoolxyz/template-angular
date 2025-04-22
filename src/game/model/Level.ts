
import { Grid, GridConfig } from "./Grid";

import { Vehicle } from "./Vehicle";

import { Tower } from "./Tower";
import { Waypoint } from "./Waypoint";


// The Level class represents a game level, which contains vehicles, towers, waypoints, and a grid for managing tower placement.
// It provides methods to add vehicles, towers, and waypoints, update vehicles, command towers to attack, and get a summary of the level.
export class Level
{
    public vehicles: Vehicle[] = []; // Array to store vehicles
    public towers: Tower[] = []; // Array to store towers
    public waypoints: Waypoint[] = []; // Array to store waypoints
    public grid: Grid; // Grid for managing tower placement

    constructor(public name: string, gridConfig: GridConfig)
    {
        this.grid = new Grid(gridConfig);
    }

    // Add a vehicle to the level
    addVehicle(vehicle: Vehicle): void
    {
        this.vehicles.push(vehicle);
    }

    // Add a waypoint to the level
    addWaypoint(waypoint: Waypoint): void
    {
        this.waypoints.push(waypoint);
    }


    // Place a tower ata specific grid cell
    placeTower(row: number, col: number, tower: Tower): boolean
    {
        if (this.grid.isValidCell(row, col) && this.grid.getCell(row, col) === null) {
            this.grid.setCell(row, col, tower);
            console.log(`Tower placed at (${row}, ${col})`);
            return true;
        } else {
            console.log(`Cannot place tower at (${row}, ${col}). Cell is invalid or occupied.`);
            return false;
        }
    }

    // Remove a tower from a specific grid cell
    removeTower(row: number, col: number): boolean
    {
        if (this.grid.isValidCell(row, col) && this.grid.getCell(row, col) !== null) {
            this.grid.setCell(row, col, null);
            console.log(`Tower removed from (${row}, ${col})`);
            return true;
        } else {
            console.log(`Cannot remove tower from (${row}, ${col}). Cell is invalid or empty.`);
            return false;
        }
    }

    // Get the tower at a specific grid cell
    getTower(row: number, col: number): Tower | null
    {
        if (this.grid.isValidCell(row, col)) {
            return this.grid.getCell(row, col);
        } else {
            console.log(`Invalid cell (${row}, ${col})`);
            return null;
        }
    }

    // Update all vehicles in the level
    updateVehicles(dt: number): void
    {
        for (const vehicle of this.vehicles)
        {
            vehicle.update(dt);
        }
    }

    // Command all towers to attack a specific target
    commandTowersToAttack(target: Vehicle): void
    {
        for (const tower of this.towers)
        {
            tower.attack(target);
        }
    }

    // Get a summary of the level
    getSummary(): string
    {
        return `Level: ${this.name}\n` +
            `Vehicles: ${this.vehicles.length}\n` +
            `Towers: ${this.towers.length}\n` +
            `Waypoints: ${this.waypoints.length}`;
    }
}