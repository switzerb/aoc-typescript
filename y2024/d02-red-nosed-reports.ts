import * as fs from "node:fs";
import path from 'node:path';

const isSafe = (report: number[]) => {
	let isIncreasing = true;
	let isDecreasing = true;
	const isStaggered = [];

	for (let i = 1; i < report.length; i++) {
		const first = report[i - 1];
		const second = report[i];

		if (first > second) {
			isIncreasing = false;
			const diff = first - second;
			isStaggered.push(diff <= 3 && diff >= 1);
		} else if (first < second) {
			isDecreasing = false;
			const diff = second - first;
			isStaggered.push(diff <= 3 && diff >= 1);
		} else {
			isDecreasing = false;
			isIncreasing = false;
		}
	}

	// If neither increasing nor decreasing, return false early.
	if (!isIncreasing && !isDecreasing) {
		return false;
	}
	return isStaggered.every((it) => it === true);
};

export const buildAlternates = (report: number[]) => {
	const alternates = [];
	for (let idx = 0; idx < report.length; idx++) {
		alternates.push(report.toSpliced(idx, 1));
	}
	return alternates;
};

export const partOne = (input: number[][]) => {
	let count = 0;
	for (const report of input) {
		if (isSafe(report)) {
			count++;
		}
	}
	return count;
};

export const partTwo = (input: number[][]) => {
	let count = 0;
	for (const report of input) {
		if (isSafe(report)) {
			count++;
		} else {
			const alternates = buildAlternates(report);
			for (const alt of alternates) {
				if (isSafe(alt)) {
					count++;
					break;
				}
			}
		}
	}
	return count;
};

export const parse = () => {
	const input = [];
	const file = fs.readFileSync(
		path.resolve(__dirname, './inputs/d02.txt'),
		"utf8",
	);
	const lines = file.split("\n");
	for (const line of lines) {
		const it = line
			.trim()
			.split(" ")
			.map((it) => Number.parseInt(it));
		input.push(it);
	}
	return input;
};
