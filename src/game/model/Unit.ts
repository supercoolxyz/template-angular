export class Unit {
    constructor(
        public x: number, // X-coordinate of the unit
        public y: number, // Y-coordinate of the unit
        public angle: number // Angle of the unit in degrees
    ) {}

    // Move the unit to a new position
    moveTo(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }

    // Rotate the unit to a new angle
    rotateTo(newAngle: number): void {
        this.angle = newAngle;
    }

    // Get the unit's position as a string
    toString(): string {
        return `Unit at (${this.x}, ${this.y}) facing ${this.angle}°`;
    }
}