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
	path: Pos[];
};

type Score = {
	points: number;
	path: Pos[];
};

const WALL = "#";

export function partOne(input: string): [number, Score[]] {
	const maze = to2DGrid(input);
	const end = getStart(maze, "E").join(",");
	const visited: Map<string, number> = new Map();
	const scores = [];

	const queue: Step[] = [];
	queue.push({
		pos: getStart(maze, "S"),
		dir: "E",
		points: 0,
		path: [],
	});

	while (queue.length) {
		const current = queue.shift();
		const key = current.pos.join(current.dir);

		if (visited.has(key) && visited.get(key) < current.points) continue;
		visited.set(key, current.points);

		if (current.pos.join(",") === end) {
			scores.push({ points: current.points, path: current.path });
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
					path: current.path.concat([current.pos]),
				});
			}
		}
	}

	const best = Math.min(...scores.map((score) => score.points));
	return [best, scores.filter((score) => score.points === best)];
}

export function partTwo(input: string) {
	const [_, solution] = partOne(input);
	const paths = solution.flatMap((each) => each.path).map((pos) => pos.join());
	return new Set(paths).size + 1; // cheesy adding of the exit position
}
