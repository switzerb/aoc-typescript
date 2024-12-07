import fs from "node:fs";
import { cloneDeep } from "lodash";
import {
	type Dir,
	type Grid,
	type Pos,
	getStart,
	next,
	print,
	to2DGrid,
	turnRight,
} from "./grid";

function onMap(grid: Grid, current: Pos) {
	return (
		current[0] < grid.length &&
		current[1] < grid[0].length &&
		current[0] >= 0 &&
		current[1] >= 0
	);
}

export const partOne = (grid: Grid, start: Pos) => {
	let current = start;
	let dir: Dir = "N";
	const positions = new Set();

	while (true) {
		const step = next(dir, current);
		const [r, c] = step;
		if (!onMap(grid, step)) {
			return positions.size;
		}
		if (grid[r][c] === "#") {
			dir = turnRight(dir);
		}
		current = next(dir, current);
		positions.add(current.join());
	}
};

export const path = (map: { map: Grid; block: Pos }, start: Pos) => {
	const { map: grid, block } = map;
	let current = start;
	let dir: Dir = "N";
	const positions = new Set();

	while (true) {
		const step = next(dir, current);
		const [r, c] = step;
		if (!onMap(grid, step)) {
			return false;
		}
		if (grid[r][c] === "#") {
			dir = turnRight(dir);
		}
		current = next(dir, current);
		const position = `${current[0]},${current[1]},${dir}`;

		if (positions.has(position)) {
			return block;
		}
		positions.add(position);
	}
};

export const partTwo = (grid: Grid, start: Pos) => {
	let current = start;
	let dir: Dir = "N";
	const maps = [];
	const blocks = new Set();

	while (true) {
		const step = next(dir, current);
		const [r, c] = step;
		if (!onMap(grid, step)) {
			break;
		}
		if (grid[r][c] === "#") {
			dir = turnRight(dir);
		} else {
			if (grid[r][c] !== "^") {
				const map = cloneDeep(grid);
				map[r][c] = "#";
				maps.push({
					map,
					block: `${r},${c}`,
				});
			}
		}
		current = next(dir, current);
	}

	for (const map of maps) {
		const block = path(map, start);
		if (block) {
			blocks.add(block);
		}
	}

	return blocks.size;
};

export const parse = (example?: string) => {
	let input: string;

	if (example) {
		input = example;
	} else {
		input = fs.readFileSync(
			"/Users/brennaswitzer/Source/aoc/aoc-typescript/y2024/inputs/d06.txt",
			"utf8",
		);
	}
	const grid = to2DGrid(input);
	const start = getStart(grid, "^");
	return { grid, start };
};

// > 1518
