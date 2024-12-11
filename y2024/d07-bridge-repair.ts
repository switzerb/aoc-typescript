import fs from "node:fs";
import path from 'node:path';

export function evaluate(target: number, values: number[]) {
	if (values.length < 2) {
		throw new Error("Length should never be less than two");
	}

	const added = values[0] + values[1];
	const mult = values[0] * values[1];

	if (values.length === 2) {
		return added === target || mult === target;
	}
	const remainder = values.slice(2);

	return (
		evaluate(target, [added, ...remainder]) ||
		evaluate(target, [mult, ...remainder])
	);
}

export function moarEval(target: number, values: number[]) {
	if (values.length < 2) {
		throw new Error("Length should never be less than two");
	}

	const added = values[0] + values[1];
	const mult = values[0] * values[1];
	const concat = values[0].toString() + values[1].toString();

	if (values.length === 2) {
		return (
			added === target || mult === target || Number.parseInt(concat) === target
		);
	}
	const remainder = values.slice(2);

	return (
		moarEval(target, [added, ...remainder]) ||
		moarEval(target, [mult, ...remainder]) ||
		moarEval(target, [Number.parseInt(concat), ...remainder])
	);
}

export function partOne(input: number[][]) {
	const possible = [];
	for (const equation of input) {
		const [target, ...values] = equation;
		if (evaluate(target, values)) {
			possible.push(target);
		}
	}
	return possible.reduce((a, n) => a + n, 0);
}

export function partTwo(input: number[][]) {
	const possible = [];
	for (const equation of input) {
		const [target, ...values] = equation;
		if (moarEval(target, values)) {
			possible.push(target);
		}
	}
	return possible.reduce((a, n) => a + n, 0);
}

export function parse() {
	const input = fs.readFileSync(
		path.resolve(__dirname, './inputs/d07.txt'),
		"utf8",
	);
	return input.split("\n").map((lines) => {
		const [target, rest] = lines.split(":").map((it) => it.trim());
		const values = rest.split(" ").map((it) => Number.parseInt(it));
		return [Number.parseInt(target), ...values];
	});
}
