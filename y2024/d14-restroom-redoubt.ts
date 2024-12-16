import fs from "node:fs";
import path from "node:path";
import { type Pos, output } from "./grid";

export type Robot = {
	p: Pos;
	v: [number, number];
};

function tick(
	robots: Robot[],
	step: number,
	rows: number,
	cols: number,
): Robot[] {
	return robots.map((robot) => {
		const [x, y] = robot.p;
		const [dx, dy] = robot.v;
		let [next_x, next_y] = [
			(x + dx * step + cols) % cols,
			(y + dy * step + rows) % rows,
		];
		if (next_x < 0) next_x += cols;
		if (next_y < 0) next_y += rows;
		return { ...robot, p: [next_x, next_y] };
	});
}

export function partOne(robots: Robot[], rows = 103, cols = 101, steps = 100) {
	const mr = Math.floor(rows / 2);
	const mc = Math.floor(cols / 2);

	return tick(robots, steps, rows, cols)
		.reduce(
			(acc, robot) => {
				const [x, y] = robot.p;
				if (x < mc && y < mr) acc[0] += 1;
				if (x < mc && y > mr) acc[1] += 1;
				if (x > mc && y < mr) acc[2] += 1;
				if (x > mc && y > mr) acc[3] += 1;
				return acc;
			},
			[0, 0, 0, 0],
		)
		.reduce((a, c) => a * c);
}

export function partTwo(init: Robot[], rows = 103, cols = 101) {
	const maps = [];

	for (let i = 0; i <= cols; i++) {
		const step = 55 + i * cols;

		const robots = tick(init, step, rows, cols);

		const map = Array.from(Array(rows), () => new Array(cols).fill(0));
		for (const robot of robots) {
			const [c, r] = robot.p;
			map[r][c] += 1;
		}

		maps.push(`STEP ${step} \n ${output(map)}`);
	}

	fs.writeFile(
		path.resolve(__dirname, "./maps.txt"),
		maps.join("\n\n"),
		(_) => {},
	);

	return 0;
}
