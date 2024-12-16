import fs from "node:fs";
import path from "node:path";
import { type Pos, output, print } from "./grid";

export type Robot = {
	p: Pos;
	v: [number, number];
};

export function partOne(init: Robot[], rows = 103, cols = 101, steps = 100) {
	let robots = init;
	const mr = Math.floor(rows / 2);
	const mc = Math.floor(cols / 2);

	function tick(robots: Robot[]): Robot[] {
		for (const robot of robots) {
			const [x, y] = robot.p;
			const [dx, dy] = robot.v;
			robot.p = [(x + dx + cols) % cols, (y + dy + rows) % rows];
		}
		return robots;
	}

	for (let i = 0; i < steps; i++) {
		const map = Array.from(Array(rows), () => new Array(cols).fill(0));

		for (const robot of robots) {
			const [c, r] = robot.p;
			map[r][c] += 1;
		}

		fs.appendFile(
			path.resolve(__dirname, "./something.txt"),
			`STEP ${i} \n ${output(map)}`,
			(err) => {
				if (err) {
					console.error(err);
				} else {
					// file written successfully
				}
			},
		);

		robots = tick(robots);
	}

	return robots
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
	let robots = init;
	const maps = [];

	function tick(robots: Robot[], step: number): Robot[] {
		return robots.map((robot) => {
			const [x, y] = robot.p;
			const [dx, dy] = robot.v;
			let [next_x, next_y] = [
				(x + dx * step + cols) % cols,
				(y + dy * step + rows) % rows,
			];
			if (next_x < 0) {
				next_x += cols;
			}
			if (next_y < 0) {
				next_y += rows;
			}
			return { ...robot, p: [next_x, next_y] };
		});
	}

	for (let i = 0; i <= cols; i++) {
		const step = 56 + i * cols;
		console.log(step);

		const map = Array.from(Array(rows), () => new Array(cols).fill(0));

		for (const robot of robots) {
			const [c, r] = robot.p;
			map[r][c] += 1;
		}

		maps.push(`STEP ${step} \n ${output(map)}`);

		robots = tick(robots, step);
	}

	fs.writeFile(
		path.resolve(__dirname, "./maps.txt"),
		maps.join("\n\n"),
		(_) => {},
	);

	return 0;
}
