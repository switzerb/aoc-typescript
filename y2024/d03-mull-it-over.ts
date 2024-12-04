import fs from "node:fs";

const RE = /mul\((\d{1,3}),(\d{1,3})\)/g;

export const parse = () => {
	return fs.readFileSync(
		"/Users/brennaswitzer/Source/aoc/aoc-typescript/y2024/inputs/d03.txt",
		"utf8",
	);
};

export const partOne = (input: string) => {
	const matches = [...input.matchAll(RE)];
	const products = [];
	for (const match of matches) {
		products.push(Number.parseInt(match[1]) * Number.parseInt(match[2]));
	}
	return products.reduce((acc, n) => acc + n);
};

export const partTwo = (input: string) => {
	const matches = [...input.matchAll(/do\(\)|don't\(\)/g)];
	const products = [];
	const indices = [0];
	const chunks = [];
	let active = "do()";
	for (const match of matches) {
		if (active === "do()" && match[0] === "don't()") {
			indices.push(match.index);
			active = "don't()";
		}
		if (active === "don't()" && match[0] === "do()") {
			indices.push(match.index);
			active = "do()";
		}
	}
	for (let i = 0; i < indices.length; i += 2) {
		const start = indices[i];
		const end = indices[i + 1];
		const chunk = end ? input.substring(start, end) : input.substring(start);
		chunks.push(chunk);
	}
	for (const chunk of chunks) {
		const matches = [...chunk.matchAll(RE)];
		for (const match of matches) {
			products.push(Number.parseInt(match[1]) * Number.parseInt(match[2]));
		}
	}
	return products.reduce((acc, n) => acc + n);
};
