// The Grid class represents a grid of towers in a tower defense game.
// It provides methods to place and remove towers, check for valid cells, and convert world positions to grid cells.
export interface GridConfig {
    rows: number; // Number of rows in the grid
    cols: number; // Number of columns in the grid
    cellWidth: number; // Width of each grid cell
    cellHeight: number; // Height of each grid cell
}

// The TowerConfig class represents the configuration for a tower, including its initial stats and increments per level.
// It can be used to create different types of towers with varying stats.
export class TowerConfig {
    constructor(
        public initialRange: number, // Initial range of the tower
        public initialDamage: number, // Initial damage of the tower
        public rangeIncrement: number, // Range increment per level
        public damageIncrement: number // Damage increment per level
    ) {}
}

// The VehicleConfig class represents the configuration for a vehicle, including its initial stats and increments per level.
// It can be used to create different types of vehicles with varying stats.
export class VehicleConfig {
    constructor(
        public initialHealth: number, // Initial health of the vehicle
        public initialSpeed: number, // Initial speed of the vehicle
        public speedIncrement: number // Speed increment per level
    ) {}
}


// The EnemyConfig class represents the configuration for an enemy, including its initial stats and increments per level.
// It can be used to create different types of enemies with varying stats.
export class EnemyConfig {
    constructor(
        public initialHealth: number, // Initial health of the enemy
        public healthIncrement: number // Health increment per level
    ) {}
}
