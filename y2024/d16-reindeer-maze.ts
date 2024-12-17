import {
	type Dir,
	type Pos,
	next as ahead,
	at,
	getStart,
	to2DGrid,
} from "./grid";

type Step = {
	pos: Pos;
	dir: Dir;
	moves: number;
	turns: number;
};

const WALL = "#";

function points(current) {
	return current.turns * 1000 + current.moves;
}

export function partOne(input: string) {
	const maze = to2DGrid(input);
	const end = getStart(maze, "E");
	const visited: Map<string, number> = new Map();
	const scores = [];

	const queue: Step[] = [];
	queue.push({
		pos: getStart(maze, "S"),
		dir: "E",
		moves: 0,
		turns: 0,
	});

	while (queue.length) {
		const current = queue.shift();
		const key = `${current.pos.join()}-${current.dir}`;

		if (visited.has(key) && visited.get(key) < points(current)) continue;
		visited.set(key, points(current));

		for (const turn of ["N", "S", "E", "W"] as Dir[]) {
			// turning 180 is pointless
			if (current.dir === "N" && turn === "S") continue;
			if (current.dir === "S" && turn === "N") continue;
			if (current.dir === "E" && turn === "W") continue;
			if (current.dir === "W" && turn === "E") continue;

			const next = ahead(turn, current.pos);

			if (next.join() === end.join()) {
				scores.push(
					(current.turns + (current.dir !== turn ? 1 : 0)) * 1000 +
						(current.moves + 1),
				);
			}

			if (at(maze, next) !== WALL) {
				queue.push({
					pos: next,
					dir: turn,
					moves: current.moves + 1,
					turns: current.turns + (current.dir !== turn ? 1 : 0),
				});
			}
		}
	}

	return Math.min(...scores);
}

export function partTwo() {
	return 0;
}
