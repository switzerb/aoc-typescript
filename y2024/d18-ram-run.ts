import { at, getNeighbors, set } from "./grid";

export function partOne(input: string, steps = 12, dim = 70, test = false) {
	const bytes = parse(input);
	const map = Array.from(Array(dim), () => new Array(dim).fill(0));
	const visited = new Set();

	for (let i = 0; i < steps; i++) {
		const [c, r] = bytes[i];
		set(map, [r, c], 1);
	}

	const queue = [];
	queue.push({
		pos: [0, 0],
		steps: 0,
	});

	while (queue.length) {
		const current = queue.shift();

		if (visited.has(current.pos.join())) continue;
		visited.add(current.pos.join());

		if (current.pos.join() === [dim - 1, dim - 1].join()) {
			return test ? 0 : current.steps;
		}

		const neighbors = getNeighbors(current.pos, dim, dim);
		for (const next of neighbors) {
			if (at(map, next) !== 1) {
				queue.push({
					pos: next,
					steps: current.steps + 1,
				});
			}
		}
	}

	return bytes[steps - 1];
}

export function partTwo(input: string, start: number, dim: number) {
	const bytes = parse(input);
	for (let i = start; i < bytes.length; i++) {
		const solution = partOne(input, i, dim, true);
		if (solution) {
			return solution.join(",");
		}
	}
	return "nope";
}

export function parse(input: string) {
	return input
		.trim()
		.split("\n")
		.map((pos) => pos.split(",").map((n) => Number(n)));
}
