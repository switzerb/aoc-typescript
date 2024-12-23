import { Grid, type Pos } from "./grid";

const numericKeypad: Map<string, Pos> = new Map([
	["7", [0, 0]],
	["8", [0, 1]],
	["9", [0, 2]],

	["4", [1, 0]],
	["5", [1, 1]],
	["6", [1, 2]],

	["1", [2, 0]],
	["2", [2, 1]],
	["3", [2, 2]],

	["X", [3, 0]],
	["0", [3, 1]],
	["A", [3, 2]],
]);

const directionalKeypad: Map<string, Pos> = new Map([
	["X", [0, 0]],
	["^", [0, 1]],
	["A", [0, 2]],
	["<", [1, 0]],
	["v", [1, 1]],
	[">", [1, 2]],
]);

const getSteps = (
	delta: Pos,
	blockLeft = false,
	blockDown = false,
	blockUp = false,
): string => {
	let moves = "";
	const [r, c] = delta;

	if (blockLeft) {
		if (r > 0) moves += "v".repeat(r);
		if (r < 0) moves += "^".repeat(-r);
		if (c < 0) moves += "<".repeat(-c);
		if (c > 0) moves += ">".repeat(c);

		moves = moves.concat("A"); // we always want to activate
		return moves;
	}

	if (blockDown) {
		if (c > 0) moves += ">".repeat(c);
		if (c < 0) moves += "<".repeat(-c);
		if (r > 0) moves += "v".repeat(r);
		if (r < 0) moves += "^".repeat(-r);

		moves = moves.concat("A"); // we always want to activate
		return moves;
	}

	if (blockUp) {
		if (c > 0) moves += ">".repeat(c);
		if (c < 0) moves += "<".repeat(-c);
		if (r < 0) moves += "^".repeat(-r);
		if (r > 0) moves += "v".repeat(r);

		moves = moves.concat("A"); // we always want to activate
		return moves;
	}

	if (c < 0) moves += "<".repeat(-c);
	if (c > 0) moves += ">".repeat(c);
	if (r > 0) moves += "v".repeat(r);
	if (r < 0) moves += "^".repeat(-r);

	moves = moves.concat("A"); // we always want to activate
	return moves;
};

export const translate = (code: string, keypad = "numeric") => {
	let curr =
		keypad === "numeric" ? numericKeypad.get("A") : directionalKeypad.get("A");
	let moves = "";

	for (const key of code) {
		const next =
			keypad === "numeric"
				? numericKeypad.get(key)
				: directionalKeypad.get(key);

		const blockLeft =
			keypad === "numeric"
				? curr[0] === 3 && next[1] === 0
				: curr[0] === 0 && next[1] === 0;

		const blockDown = curr[1] === 0 && next[0] === 3;

		const blockUp = curr[0] === 1 && next[0] === 0;

		const delta = Grid.diff(next, curr);
		const steps = getSteps(delta, blockLeft, blockDown, blockUp);
		moves += steps;

		curr = next;
	}

	return moves;
};

export function partOne(input: string) {
	const codes = parse(input);
	const sequences = [];
	for (const code of codes) {
		const robotOne = translate(code, "numeric");
		const robotTwo = translate(robotOne, "directional");
		const me = translate(robotTwo, "directional");
		const val = Number(code.slice(0, -1));
		sequences.push(me.length * val);
	}

	return sequences.reduce((acc, n) => acc + n);
}

export function partTwo() {
	return 0;
}

export function parse(input: string) {
	return input.trim().split("\n");
}
