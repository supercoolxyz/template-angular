export class Vec2 {
    constructor(public x: number, public y: number) {}

    // Calculate the distance to another Vec2
    distanceTo(other: Vec2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Add another Vec2 to this one
    add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    // Subtract another Vec2 from this one
    subtract(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    // Convert to string
    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}