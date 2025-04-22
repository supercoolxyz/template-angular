import { GridConfig } from "./config";
import { Tower } from "./Unit";
import { Vec2 } from "./Vec2";

// The TGrid class is a generic 2D grid structure that can hold any type of data (T).
// It provides methods to get and set values in the grid, as well as to check if a cell is valid.
// It is used as a base class for the Grid class, which specifically handles tower placement in a tower defense game.
class TGrid<T> {
    protected grid: T[][];
        
    constructor(
          protected rows: number
        , protected cols: number) {
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    }

    // Get the cell in the grid based on row and column indices
    // Returns the value at the specified cell or null if the cell is empty
    getCell(row: number, col: number): T | null {
        // Check if the row and column indices are within bounds
        // If not, throw an error
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error(`Invalid cell coordinates: (${row}, ${col})`);
        }

        // Return the value at the specified cell
        return this.grid[row][col];
    }

    // Set the cell in the grid based on row and column indices
    setCell(row: number, col: number, value: T): void {
        // Check if the row and column indices are within bounds
        // If not, throw an error
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error(`Invalid cell coordinates: (${row}, ${col})`);
        }

        // Set the value at the specified cell
        this.grid[row][col] = value;
    }
}

// The Grid class represents a grid of towers in a tower defense game.
// It provides methods to place and remove towers, check for valid cells, and convert world positions to grid cells.
// It uses a 2D array to store the towers and their positions.
export class Grid  extends TGrid<Tower | null> {

    public cellWidth: number; // Width of each grid cell
    public cellHeight: number; // Height of each grid cell

    constructor(private config: GridConfig) {
        super(config.rows, config.cols);
        this.cellWidth = config.cellWidth; // Set the cell width from the configuration
        this.cellHeight = config.cellHeight; // Set the cell height from the configuration
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