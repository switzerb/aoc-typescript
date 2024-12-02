/**
 * --- Day 1: Historian Hysteria ---
 * https://adventofcode.com/2024/day/1
 */

// locationId -> count
type Histogram = Record<number, number>;

const partition = (input: number[][]) => {
	const left = [];
	const right = [];
	// error check the input
	for (const n of input) {
		left.push(n[0]);
		right.push(n[1]);
	}
	left.sort();
	right.sort();
	return [left, right];
};

export const partOne = (input: number[][]) => {
	const [left, right] = partition(input);
	const distances = [];
	const len = Math.max(left.length, right.length);

	for (let idx = 0; idx < len; idx++) {
		distances.push(Math.abs(left[idx] - right[idx]));
	}
	return distances.reduce((acc, it) => acc + it, 0);
};

export const partTwo = (input: number[][]) => {
	const [left, right] = partition(input);
	const similarities = [];
	const hist = right.reduce((acc, it) => {
		if (it in acc) {
			acc[it] = acc[it] + 1;
		} else {
			acc[it] = 1;
		}
		return acc;
	}, {} as Histogram);

	for (const it of left) {
		let score = 0;
		if (it in hist) {
			score = it * hist[it];
		}
		similarities.push(score);
	}
	return similarities.reduce((acc, it) => acc + it, 0);
};
