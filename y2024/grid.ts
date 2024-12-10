export type Dir = "N" | "S" | "E" | "W";
export type Pos = [number, number];
export type Grid = string[][];

export const to2DGrid = (input: string) =>
	input
		.trim()
		.split("\n")
		.map((line) => line.trim().split(""));

export const getStart = (grid: string[][], target: string): Pos => {
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

export const next = (dir: Dir, pos: Pos): Pos => {
	switch (dir) {
		case "N":
			return [pos[0] - 1, pos[1]];
		case "S":
			return [pos[0] + 1, pos[1]];
		case "E":
			return [pos[0], pos[1] + 1];
		case "W":
			return [pos[0], pos[1] - 1];
	}
};

export function print(grid: Grid) {
	for (const [r, row] of grid.entries()) {
		let line = "";
		for (const [c, _] of row.entries()) {
			line = line + grid[r][c];
		}
		console.log(line);
	}
	console.log("\n");
}
