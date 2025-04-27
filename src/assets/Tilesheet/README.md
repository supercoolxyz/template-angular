# Level tileset specification

## Tile specification
* Terrain types
 * Grass => g
 * Tarmak => t
 * Sand => s
 * Cement => c


### Syntax
* Terrain type 0 [+ Terrain type 1] [+ Terrain type 2] + Orientation + 
* Examples: 
    * Grass + Tarmak + Vertical => gtv
    * Grass + Sand + Water + Vertical => gswv


### Waypoint definitions
 Vertical(x, y) = tile_width / 2 + x_offset, tile_height / 2 + y_offset
 Horizontal(x, y) = tile_width / 2 + x_offset, tile_height / 2 + y_offset
 
