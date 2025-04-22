import { Vec2 } from "./Vec2";

// The Grid class represents a grid of towers in a tower defense game.
// It provides methods to place and remove towers, check for valid cells, and convert world positions to grid cells.
export interface GridConfig {
    rows: number; // Number of rows in the grid
    cols: number; // Number of columns in the grid
    cellWidth: number; // Width of each grid cell
    cellHeight: number; // Height of each grid cell
}

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
export class Grid extends TGrid<any> {

    public cellWidth: number; // Width of each grid cell
    public cellHeight: number; // Height of each grid cell

    // The grid is a 2D array of cells, where each cell can hold a tower or be empty
    constructor(private config: GridConfig) {
        super(config.rows, config.cols); // Call the parent constructor with rows and columns
        this.cellWidth = config.cellWidth; // Set the cell width from the configuration
        this.cellHeight = config.cellHeight; // Set the cell height from the configuration
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
    isValidCell(row: number, col: number): boolean {
        return row >= 0 && row < this.config.rows && col >= 0 && col < this.config.cols;
    }
}