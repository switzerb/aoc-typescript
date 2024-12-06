import fs from "node:fs";

const isOrdered = (update: string[], rules) => {
	let isOrdered = true;
	for (const [idx, page] of update.entries()) {
		const next = update.slice(idx + 1);
		if (!rules[page] && next.length > 0) {
			isOrdered = false;
			break;
		}
		if (!next.every((it) => rules[page].includes(it))) {
			isOrdered = false;
			break;
		}
	}
	return isOrdered;
};

const swap = (update, rules) => {
	for (const [idx, page] of update.entries()) {
		const rest = update.slice(idx + 1);
		if (!rules[page] && rest.length > 0) {
			update.splice(idx, 1);
			update.push(page);
			return update;
		}
		if (!rest.every((it) => rules[page].includes(it))) {
			const swap = rest[0];
			if (rules[swap].includes(page)) {
				update.splice(idx, 1);
				update.splice(idx + 1, 0, page);
				return update;
			}
		}
	}
};

export const partOne = (
	rules: Record<string, string[]>,
	updates: string[][],
) => {
	const ordered = [];
	for (const update of updates) {
		if (isOrdered(update, rules)) {
			ordered.push(update);
		}
	}
	return ordered.reduce(
		(acc, it) =>
			Number.parseInt(acc) + Number.parseInt(it[Math.floor(it.length / 2)]),
		0,
	);
};

export const partTwo = (
	rules: Record<string, string[]>,
	updates: string[][],
) => {
	const unordered = [];
	const fixed = [];
	for (const update of updates) {
		if (!isOrdered(update, rules)) {
			unordered.push(swap(update, rules));
		}
	}
	while (unordered.length > 0) {
		const update = unordered.shift();
		isOrdered(update, rules)
			? fixed.push(update)
			: unordered.push(swap(update, rules));
	}
	console.log({ unordered, fixed });
	return fixed.reduce(
		(acc, it) =>
			Number.parseInt(acc) + Number.parseInt(it[Math.floor(it.length / 2)]),
		0,
	);
};

export const parse = () => {
	const rules: Record<string, string[]> = {};
	const input = fs.readFileSync(
		"/Users/brennaswitzer/Source/aoc/aoc-typescript/y2024/inputs/d05.txt",
		"utf8",
	);
	const [rawRules, rawUpdates] = input.split("\n\n");
	const parsedRules = rawRules.split("\n").map((it) => it.split("|"));
	const updates = rawUpdates.split("\n").map((it) => it.split(","));

	for (const rule of parsedRules) {
		const key = rule[0];
		const value = rule[1];
		if (key in rules) {
			rules[key] = rules[key].concat([value]);
		} else {
			rules[key] = [value];
		}
	}
	return { rules, updates };
};
