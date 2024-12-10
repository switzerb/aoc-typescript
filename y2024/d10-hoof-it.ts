import { type Dir, type Pos, at, next } from "./grid";

function getNeighbors(pos: Pos, w, h): Pos[] {
	const neighbors = [];
	for (const dir of ["N", "S", "E", "W"] as Dir[]) {
		neighbors.push(next(dir, pos));
	}
	return neighbors.filter(
		(pos) => pos[0] >= 0 && pos[0] < h && pos[1] >= 0 && pos[1] < w,
	);
}

export function partOne(input: string, rating?: boolean) {
	const { map, trailheads, w, h } = parse(input);
	const scores = [];
	const ratings = [];

	for (const trailhead of trailheads) {
		let score = 0;
		let rating = 0;
		const queue = [];
		const visited = new Set();
		const trailends = new Set();
		queue.push(trailhead);

		while (queue.length) {
			const spot = queue.shift();
			visited.add(spot.join());

			if (at(map, spot) === 9) {
				if (!trailends.has(spot.join())) {
					trailends.add(spot.join());
					score++;
				}
				rating++;
			}

			const neighbors = getNeighbors(spot, w, h).filter(
				(pos) => !visited.has(pos.join()),
			);
			const stepped = neighbors.filter((pos) => {
				const curr = at(map, spot);
				const next = at(map, pos);
				return next - curr === 1;
			});
			queue.push(...stepped);
		}
		scores.push(score);
		ratings.push(rating);
	}

	if (rating) {
		return ratings.reduce((a, s) => a + s);
	}
	return scores.reduce((a, s) => a + s);
}

export function partTwo(input: string) {
	return partOne(input, true);
}

export function parse(input: string) {
	const trailheads = [];
	const map = input
		.trim()
		.split("\n")
		.map((line) => line.split("").map((pos) => Number(pos)));

	// get all the trailheads
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[0].length; c++) {
			if (map[r][c] === 0) {
				trailheads.push([r, c]);
			}
		}
	}
	return { map, trailheads, w: map[0].length, h: map.length };
}
