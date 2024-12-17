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
const SPACE = ".";

export function partOne(input: string) {
	const maze = to2DGrid(input);
	const end = getStart(maze, "E");
	const visited: Set<string> = new Set();
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
		visited.add(current.pos.join());

		for (const turn of ["N", "S", "E", "W"] as Dir[]) {
			const next = ahead(turn, current.pos);
			if (visited.has(next.join())) {
				continue;
			}
			if (next.join() === end.join()) {
				scores.push(current.turns * 1000 + current.moves + 1);
			}
			if (at(maze, next) === SPACE && !visited.has(next.join())) {
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
