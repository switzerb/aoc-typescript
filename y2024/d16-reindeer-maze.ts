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
	points: number;
};

const WALL = "#";

export function partOne(input: string) {
	const maze = to2DGrid(input);
	const end = getStart(maze, "E").join(",");
	const visited: Map<string, number> = new Map();
	const scores = [];

	const queue: Step[] = [];
	queue.push({
		pos: getStart(maze, "S"),
		dir: "E",
		points: 0,
	});

	while (queue.length) {
		const current = queue.shift();
		const key = current.pos.join(current.dir);

		if (visited.has(key) && visited.get(key) < current.points) continue;
		visited.set(key, current.points);

		if (current.pos.join(",") === end) {
			scores.push(current.points);
		}

		for (const turn of ["N", "S", "E", "W"] as Dir[]) {
			// turning 180 is pointless
			if (current.dir === "N" && turn === "S") continue;
			if (current.dir === "S" && turn === "N") continue;
			if (current.dir === "E" && turn === "W") continue;
			if (current.dir === "W" && turn === "E") continue;

			const next = ahead(turn, current.pos);

			if (at(maze, next) !== WALL) {
				queue.push({
					pos: next,
					dir: turn,
					points: current.points + (current.dir === turn ? 1 : 1001),
				});
			}
		}
	}

	return Math.min(...scores);
}

export function partTwo() {
	return 0;
}
