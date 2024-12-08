import fs from "node:fs";
import { cloneDeep } from "lodash";
import {
	type Dir,
	type Pos,
	getStart,
	next,
	print,
	to2DGrid,
	turnRight,
} from "./grid";

const parse = (input: string) => {
	const grid = to2DGrid(input);
	const start = getStart(grid, "^");

	const onMap = (current: Pos) => {
		return (
			current[0] < grid.length &&
			current[1] < grid[0].length &&
			current[0] >= 0 &&
			current[1] >= 0
		);
	};

	const addBlock = (r: number, c: number) => {
		const map = cloneDeep(grid);
		map[r][c] = "#";

		return map;
	};

	const getAt = (pos: Pos) => grid[pos[0]][pos[1]];

	return { grid, start, onMap, addBlock, getAt };
};

export const partOne = (input: string) => {
	const { grid, start, onMap } = parse(input);
	let current = start;
	let dir: Dir = "N";
	const positions = new Set();

	while (true) {
		const step = next(dir, current);
		const [r, c] = step;
		if (!onMap(step)) {
			return positions.size;
		}
		if (grid[r][c] === "#") {
			dir = turnRight(dir);
			continue;
		}
		current = next(dir, current);
		positions.add(current.join());
	}
};

export const partTwo = (input: string) => {
	const { grid, start, onMap, addBlock, getAt } = parse(input);
	let current = start;
	let dir: Dir = "N";
	const blocks: Pos[] = [];
	const possible = new Set();

	while (true) {
		const step = next(dir, current);
		if (!onMap(step)) {
			break;
		}
		if (getAt(step) === "#") {
			dir = turnRight(dir);
			continue;
		}
		if (getAt(step) !== "^") {
			blocks.push(step);
		}
		current = next(dir, current);
	}

	const path = (block: Pos) => {
		const option = block ? addBlock(...block) : grid;
		let current = start;
		let dir: Dir = "N";
		const positions = new Set();

		while (true) {
			const step = next(dir, current);
			const [r, c] = step;
			if (!onMap(step)) {
				return false;
			}
			if (option[r][c] === "#") {
				dir = turnRight(dir);
				continue;
			}
			current = next(dir, current);
			const position = `${current.join()},${dir}`;

			if (positions.has(position)) {
				return true;
			}
			positions.add(position);
		}
	};

	for (const block of blocks) {
		const hasCycle = path(block);
		if (hasCycle) {
			possible.add(block.join());
		}
	}

	return possible.size;
};

// > 1518
// 1305
