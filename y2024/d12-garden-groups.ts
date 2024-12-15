import {at, type Dir, getNeighbors, type Grid, inBounds, next, type Pos, to2DGrid} from './grid';

const SIDES = 4;

function traverse(map: Grid, start: Pos) {
    const w = map[0].length;
    const h = map.length;
    const plant = at(map, start);
    const queue = [];
    const visited = new Set();
    queue.push(start);
    let perimeter = 0;
    let sides = 0;

    /** external corner
     * N & W !== plant
     * N & E !== plant
     * S & W !== plant
     * S & E !== plant
     * **/
    function isExternalCorner(pos, corner: Dir[]) {
        const first = next(corner[0],pos);
        const second = next(corner[1],pos);
        const firstOut = inBounds(first,w,h) ? at(map, first) !== plant : true;
        const secondOut = inBounds(second,w,h) ? at(map, second) !== plant : true;
        return firstOut && secondOut;
    }

    /** internal corner
     * NW !== plant but N && W are
     * NE !== plant but N && E are
     * SW !== plant but S && W are
     * SE !== plant but S && E are
     * **/
    function isInternalCorner(pos, corner){
        const [dir1, dir2] = corner;
        const first = next(dir1,pos);
        const second = next(dir2,pos);
        const diag = next(corner.join(""),pos);

        const firstInBounds = inBounds(first, w, h);
        const secondInBounds = inBounds(second, w, h);

        if(firstInBounds && secondInBounds) {
            const firstPlant = at(map, first);
            const secondPlant = at(map, second);
            const diagPlant = at(map, diag);
            return firstPlant === plant && secondPlant === plant && diagPlant !== plant;
        }

        return false;
    }

    while(queue.length > 0) {
        const square = queue.shift();
        if(visited.has(square.join())) {
            continue;
        }
        const neighbors = getNeighbors(square, w, h);
        visited.add(square.join())
        perimeter += (SIDES - neighbors.length);

        for (const pos of neighbors) {
            const neighbor = at(map, pos);
            if(neighbor === plant && !visited.has(pos.join())) {
                queue.push(pos);
            }
            if(neighbor !== plant) {
                perimeter += 1;
            }
        }
        if(isExternalCorner(square,["N","W"])) sides++;
        if(isExternalCorner(square,["N","E"])) sides++;
        if(isExternalCorner(square,["S","W"])) sides++;
        if(isExternalCorner(square,["S","E"])) sides++;

        if(isInternalCorner(square,["N","W"])) sides++;
        if(isInternalCorner(square,["N","E"])) sides++;
        if(isInternalCorner(square,["S","W"])) sides++;
        if(isInternalCorner(square,["S","E"])) sides++;
    }
    return {area: visited.size, perimeter, seen: visited, sides}
}

export function partOne(input: string, discount = false)  {
    const map = to2DGrid(input);
    const prices = [];
    const discounted = [];
    let visited = new Set();

    for(let r = 0; r < map.length; r++) {
        for(let c = 0; c < map[0].length; c++) {
            if(!visited.has([r,c].join())) {
                const {area, perimeter, seen, sides} = traverse(map, [r,c]);
                prices.push(area * perimeter);
                discounted.push(area * sides);
                visited = visited.union(seen);
            }
        }
    }
    return discount ? discounted.reduce((a,d) => a + d) : prices.reduce((a,p) => a + p);
}

export function partTwo(input: string) {
    return partOne(input, true);
}