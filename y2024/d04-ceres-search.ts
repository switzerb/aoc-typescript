import fs from "node:fs";
import path from 'node:path';

const WORD = ["X", "M", "A", "S"];

export const parse = () => {
	const grid: string[][] = [];
	const file = fs.readFileSync(
		path.resolve(__dirname, './inputs/d04.txt'),
		"utf8",
	);
	const lines = file.split("\n");
	for (const line of lines) {
		const it = line.trim().split("");
		grid.push(it);
	}
	return grid;
};

/**
 * XMAS || SAMX
 * [0][0],[0][1],[0][2],[0][3]
 * [0][0],[0][-1],[0][-2],[0][-3]
 *
 * X || S
 * M || A
 * A || M
 * S || X
 * [0][0],[1][0],[2][0],[3][0]
 * [0][0],[-1][0],[-2][0],[-3][0]
 *
 * X || S
 *  M || A
 *   A || M
 *    S || X
 * [0][0],[1][1],[2][2],[3][3]
 * [0][0],[-1][-1],[-2][-2],[-3][-3]
 *
 *    X || S
 *   M || A
 *  A || M
 * S || X
 * [0][0],[1][-1],[2][-2],[3][-3]
 * [0][0],[-1][1],[-2][2],[-3][3]
 */

const getStartPositions = (grid: string[][], start = "X") => {
	const X = [];
	for (const [row, line] of grid.entries()) {
		for (const [col, letter] of line.entries()) {
			if (letter === start) {
				X.push([row, col]);
			}
		}
	}
	return X;
};

const xmas = {
	h: [
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3],
	],
	hr: [
		[0, 0],
		[0, -1],
		[0, -2],
		[0, -3],
	],
	v: [
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0],
	],
	vr: [
		[0, 0],
		[-1, 0],
		[-2, 0],
		[-3, 0],
	],
	dr: [
		[0, 0],
		[1, 1],
		[2, 2],
		[3, 3],
	],
	drr: [
		[0, 0],
		[-1, -1],
		[-2, -2],
		[-3, -3],
	],
	dl: [
		[0, 0],
		[1, -1],
		[2, -2],
		[3, -3],
	],
	dlr: [
		[0, 0],
		[-1, 1],
		[-2, 2],
		[-3, 3],
	],
};

export const partOne = (grid: string[][]) => {
	let count = 0;
	const dist = 3;

	const startX = getStartPositions(grid, "X");

	const width = grid[0].length;
	const height = grid.length;

	const canUp = (row: number) => row >= dist;
	const canDown = (row: number) => row < height - dist;
	const canLeft = (col: number) => col >= dist;
	const canRight = (col: number) => col < width - dist;

	const matchDir = (start: number[], positions: number[][]) => {
		for (const [idx, p] of positions.entries()) {
			const row = start[0] + p[0];
			const col = start[1] + p[1];

			const letter = grid[row][col];
			const target = WORD[idx];
			if (letter !== target) {
				return false;
			}
		}
		return true;
	};

	for (const pos of startX) {
		const r = pos[0];
		const c = pos[1];

		for (const [dir, positions] of Object.entries(xmas)) {
			switch (dir) {
				case "h": {
					if (canRight(c)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "hr": {
					if (canLeft(c)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "v": {
					if (canDown(r)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "vr": {
					if (canUp(r)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "dl": {
					if (canDown(r) && canLeft(c)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "dlr": {
					if (canUp(r) && canRight(c)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "dr": {
					if (canDown(r) && canRight(c)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
				case "drr": {
					if (canUp(r) && canLeft(c)) {
						const match = matchDir(pos, positions);
						if (match) count += 1;
					}
					break;
				}
			}
		}
	}
	return count;
};

export const partTwo = (grid: string[][]) => {
	const dist = 1;
	let count = 0;
	const startA = getStartPositions(grid, "A");

	const width = grid[0].length;
	const height = grid.length;

	const canUp = (row: number) => row >= dist;
	const canDown = (row: number) => row < height - dist;
	const canLeft = (col: number) => col >= dist;
	const canRight = (col: number) => col < width - dist;

	const can = (r, c) => canUp(r) && canLeft(c) && canDown(r) && canRight(c);

	for (const pos of startA) {
		const r = pos[0];
		const c = pos[1];

		try {
			const d1 =
				(grid[r - 1][c - 1] === "M" && grid[r + 1][c + 1] === "S") ||
				(grid[r - 1][c - 1] === "S" && grid[r + 1][c + 1] === "M");
			const d2 =
				(grid[r - 1][c + 1] === "S" && grid[r + 1][c - 1] === "M") ||
				(grid[r - 1][c + 1] === "M" && grid[r + 1][c - 1] === "S");

			if (d1 && d2) {
				count += 1;
			}
		} catch (e) {
			// cheaters way of doing boundary conditions
		}
	}

	return count;
};
