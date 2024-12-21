export type Dir = "N" | "S" | "E" | "W";
export type DirFull = Dir | "NW" | "SW" | "NE" | "SE";
export type Pos = [number, number];
export type Grid = string[][];

export const to2DGrid = (input: string) =>
	input
		.trim()
		.split("\n")
		.map((line) => line.trim().split(""));

export const getTarget = (grid: string[][], target: string): Pos => {
	for (const [row, line] of grid.entries()) {
		for (const [col, point] of line.entries()) {
			if (point === target) {
				return [row, col];
			}
		}
	}
	return [0, 0];
};

export function at(grid, pos) {
	return grid[pos[0]][pos[1]];
}

export function set(grid, pos, val) {
	const [r, c] = pos;
	grid[r][c] = val;
	return;
}

export const turnRight = (dir: Dir) => {
	switch (dir) {
		case "N":
			return "E";
		case "S":
			return "W";
		case "E":
			return "S";
		case "W":
			return "N";
	}
};

export function inBounds(pos: Pos, w, h) {
	return pos[0] >= 0 && pos[0] < h && pos[1] >= 0 && pos[1] < w;
}

export function getNeighbors(pos: Pos, w, h, bounded = true): Pos[] {
	const neighbors = [];
	for (const dir of ["N", "S", "E", "W"] as Dir[]) {
		neighbors.push(next(dir, pos));
	}
	return bounded ? neighbors.filter((pos) => inBounds(pos, w, h)) : neighbors;
}

export const next = (dir: DirFull, pos: Pos): Pos => {
	switch (dir) {
		case "E":
			return [pos[0], pos[1] + 1];
		case "S":
			return [pos[0] + 1, pos[1]];
		case "W":
			return [pos[0], pos[1] - 1];
		case "N":
			return [pos[0] - 1, pos[1]];
		case "NW":
			return [pos[0] - 1, pos[1] - 1];
		case "SW":
			return [pos[0] + 1, pos[1] - 1];
		case "NE":
			return [pos[0] - 1, pos[1] + 1];
		case "SE":
			return [pos[0] + 1, pos[1] + 1];
	}
};

export function print(grid: Grid) {
	for (const [r, row] of grid.entries()) {
		let line = "";
		for (const [c, _] of row.entries()) {
			if (Number(grid[r][c]) === 0) {
				line = `${line}.`;
			} else {
				line = line + grid[r][c];
			}
		}
		console.log(line);
	}
	console.log("\n");
}

export function clone(grid: Grid) {
	return grid.map((row) => row.slice());
}

export function output(grid: Grid) {
	return grid
		.map((row) => {
			return `${row.map((it) => (it ? "#" : ".")).join("")}`;
		})
		.join("\n");
}
