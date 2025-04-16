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

    // Calculate the dot product with another Vec2
    dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    // Calculate the cross product with another Vec2
    cross(other: Vec2): number {
        return this.x * other.y - this.y * other.x;
    }

    // Get a perpendicular vector (rotated 90 degrees counterclockwise)
    perpendicular(): Vec2 {
        return new Vec2(-this.y, this.x);
    }

    // Normalize this Vec2 to a unit vector
    normalize(): Vec2 {
        const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        return magnitude === 0 ? new Vec2(0, 0) : new Vec2(this.x / magnitude, this.y / magnitude);
    }


    // Convert to string
    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
