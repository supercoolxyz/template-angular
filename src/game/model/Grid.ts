import { Tower } from "./Unit";
import { Vec2 } from "./Vec2";

// The Grid class represents a grid of towers in a tower defense game.
// It provides methods to place and remove towers, check for valid cells, and convert world positions to grid cells.
export interface GridConfig {
    rows: number; // Number of rows in the grid
    cols: number; // Number of columns in the grid
    cellWidth: number; // Width of each grid cell
    cellHeight: number; // Height of each grid cell
}

// The Grid class represents a grid of towers in a tower defense game.
// It provides methods to place and remove towers, check for valid cells, and convert world positions to grid cells.
// It uses a 2D array to store the towers and their positions.
export class Grid {
    private grid: (Tower | null)[][]; // 2D array to store towers or null
    private cellWidth: number;
    private cellHeight: number;

    constructor(private config: GridConfig) {
        this.cellWidth = config.cellWidth;
        this.cellHeight = config.cellHeight;
        this.grid = Array.from({ length: config.rows }, () => Array(config.cols).fill(null));
    }

    // Place a tower at a specific grid cell
    placeTower(row: number, col: number, tower: Tower): boolean {
        if (this.isValidCell(row, col) && this.grid[row][col] === null) {
            this.grid[row][col] = tower;
            console.log(`Tower placed at (${row}, ${col})`);
            return true;
        } else {
            console.log(`Cannot place tower at (${row}, ${col}). Cell is invalid or occupied.`);
            return false;
        }
    }

    // Remove a tower from a specific grid cell
    removeTower(row: number, col: number): boolean {
        if (this.isValidCell(row, col) && this.grid[row][col] !== null) {
            this.grid[row][col] = null;
            console.log(`Tower removed from (${row}, ${col})`);
            return true;
        } else {
            console.log(`Cannot remove tower from (${row}, ${col}). Cell is invalid or empty.`);
            return false;
        }
    }

    // Get the tower at a specific grid cell
    getTower(row: number, col: number): Tower | null {
        if (this.isValidCell(row, col)) {
            return this.grid[row][col];
        } else {
            console.log(`Invalid cell (${row}, ${col})`);
            return null;
        }
    }

    // Convert a world position to a grid cell
    worldToGrid(position: Vec2): { row: number; col: number } | null {
        const col = Math.floor(position.x / this.cellWidth);
        const row = Math.floor(position.y / this.cellHeight);
        if (this.isValidCell(row, col)) {
            return { row, col };
        } else {
            console.log(`Position (${position.x}, ${position.y}) is outside the grid.`);
            return null;
        }
    }

    // Check if a cell is valid
    private isValidCell(row: number, col: number): boolean {
        return row >= 0 && row < this.config.rows && col >= 0 && col < this.config.cols;
    }
}