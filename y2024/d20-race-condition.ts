import {
	type Grid,
	type Pos,
	at,
	getNeighbors,
	getTarget,
	inBounds,
	to2DGrid,
} from "./grid";

const WALL = "#";

function getPath(map) {
	const start = getTarget(map, "S");
	const path = new Map();
	let dist = 0;
	path.set(start.join(), dist);

	let current = start;

	const getNext = (current: Pos) => {
		const neighbors = getNeighbors(current, map[0].length, map.length);
		for (const neighbor of neighbors) {
			if (at(map, neighbor) !== "#" && !path.has(neighbor.join())) {
				return neighbor;
			}
		}
		throw new Error("There is no way forward.");
	};

	while (true) {
		if (current.join() === getTarget(map, "E").join()) {
			return path;
		}
		const next = getNext(current);
		dist += 1;
		path.set(next.join(), dist);
		current = next;
	}
}

function isCheatable(map: Grid, first: Pos, second: Pos): boolean {
	try {
		return at(map, first) === WALL && at(map, second) !== WALL;
	} catch (err) {
		return false;
	}
}

export function partOne(input: string) {
	const map = to2DGrid(input);
	const path = getPath(map);
	const cheats = new Map();
	const positions = Array.from(path.keys()).map((pos) =>
		pos.split(",").map((n) => Number(n)),
	);

	for (const p of positions) {
		for (const dir of ["N", "S", "E", "W"]) {
			let f: Pos;
			let s: Pos;
			switch (dir) {
				case "E": {
					f = [p[0], p[1] + 1];
					s = [p[0], p[1] + 2];
					break;
				}
				case "S": {
					f = [p[0] + 1, p[1]];
					s = [p[0] + 2, p[1]];
					break;
				}
				case "W": {
					f = [p[0], p[1] - 1];
					s = [p[0], p[1] - 2];
					break;
				}
				case "N": {
					f = [p[0] - 1, p[1]];
					s = [p[0] - 2, p[1]];
					break;
				}
			}
			if (isCheatable(map, f, s)) {
				const shortcutDist = path.get(s.join()) - path.get(p.join()) - 2;
				if (shortcutDist > 0) {
					cheats.set(`${p.join()}|${s.join()}`, shortcutDist);
				}
			}
		}
	}

	const hist = new Map();
	for (const [_, shortcut] of cheats.entries()) {
		hist.set(shortcut, hist.has(shortcut) ? hist.get(shortcut) + 1 : 1);
	}
	return Array.from(hist.entries()).reduce(
		(acc, [key, value]) => (key >= 100 ? acc + value : acc),
		0,
	);
}

function getPointsWithinManhattanDistance(pos: Pos, maxDistance) {
	const points = [];

	for (let r = pos[0] - maxDistance; r <= pos[0] + maxDistance; r++) {
		for (let c = pos[1] - maxDistance; c <= pos[1] + maxDistance; c++) {
			if (getManhattanDistance([r, c], pos) <= maxDistance) {
				points.push([r, c]);
			}
		}
	}

	return points;
}

function getManhattanDistance(p1: Pos, p2: Pos) {
	return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

export function partTwo(input: string) {
	const map = to2DGrid(input);
	const w = map[0].length;
	const h = map.length;
	const path = getPath(map);
	const cheats = new Map();
	const MAX = 20;
	const positions = Array.from(path.keys()).map((pos) =>
		pos.split(",").map((n) => Number(n)),
	);

	for (const p of positions) {
		const potentials = getPointsWithinManhattanDistance(p, MAX);
		for (const pos of potentials) {
			try {
				if (inBounds(pos, w, h) && at(map, pos) !== WALL) {
					const shortcutDist =
						path.get(pos.join()) -
						path.get(p.join()) -
						getManhattanDistance(pos, p);
					if (shortcutDist > 0) {
						cheats.set(`${p.join()}|${pos.join()}`, shortcutDist);
					}
				}
			} catch (err) {
				// we are off the map and we don't care
			}
		}
	}

	const hist = new Map();
	for (const [_, shortcut] of cheats.entries()) {
		hist.set(shortcut, hist.has(shortcut) ? hist.get(shortcut) + 1 : 1);
	}
	return Array.from(hist.entries()).reduce(
		(acc, [key, value]) => (key >= 100 ? acc + value : acc),
		0,
	);
}
