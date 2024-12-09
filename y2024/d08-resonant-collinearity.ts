export type Pos = number[];

export function getAntiNodes(a: Pos, b: Pos): Pos[] {
	const [r, c] = [a[0] - b[0], a[1] - b[1]];
	return [
		[a[0] + r, a[1] + c],
		[b[0] - r, b[1] - c],
	];
}

const sub = (a: Pos, b: Pos): Pos => [a[0] - b[0], a[1] - b[1]];
const add = (a: Pos, b: Pos): Pos => [a[0] + b[0], a[1] + b[1]];

export function getMoarAntiNodes(a: Pos, b: Pos, w, h): Pos[] {
	const d = sub(a, b);
	const nodes = [];

	for (let p = a; onMap(p, w, h); p = add(p, d)) {
		nodes.push(p);
	}
	for (let p = a; onMap(p, w, h); p = sub(p, d)) {
		nodes.push(p);
	}

	return nodes;
}

function onMap(n: Pos, w: number, h: number) {
	return n[0] >= 0 && n[0] < h && n[1] >= 0 && n[1] < w;
}

function getPairs(antennae): Pos[][] {
	const pairs: Pos[][] = [];
	for (let i = 0; i < antennae.length; i++) {
		for (let j = i + 1; j < antennae.length; j++) {
			pairs.push([antennae[i], antennae[j]]);
		}
	}
	return pairs;
}

export function partOne(input: string) {
	const { w, h, locations } = parse(input);
	const antinodes = [];

	for (const antennae of Object.values(locations)) {
		const pairs = getPairs(antennae);
		for (const pair of pairs) {
			antinodes.push(...getAntiNodes(pair[0], pair[1]));
		}
	}

	return new Set(antinodes.filter((n) => onMap(n, w, h)).map((n) => n.join()))
		.size;
}

export function partTwo(input: string) {
	const { w, h, locations } = parse(input);
	const antinodes = [];

	for (const antennae of Object.values(locations)) {
		const pairs = getPairs(antennae);
		for (const pair of pairs) {
			antinodes.push(...getMoarAntiNodes(pair[0], pair[1], w, h));
		}
	}

	return new Set(antinodes.filter((n) => onMap(n, w, h)).map((n) => n.join()))
		.size;
}

function parse(text: string) {
	const locations: Record<string, Pos[]> = {};
	const input = text
		.trim()
		.split("\n")
		.map((line) => line.split(""));
	const w = input[0].length;
	const h = input.length;
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			const char = input[i][j];
			if (char !== ".") {
				if (locations[char]) {
					locations[char].push([i, j] as Pos);
				} else {
					locations[char] = [];
					locations[char].push([i, j] as Pos);
				}
			}
		}
	}
	return { w, h, locations };
}
