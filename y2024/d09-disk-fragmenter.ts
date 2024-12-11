import { cloneDeep } from "lodash";

const isSpace = (digit) => digit === ".";

const checksum = (diskmap: string[]) => {
	const products = [];
	for (const [idx, digit] of diskmap.entries()) {
		if (digit !== ".") {
			products.push(idx * Number(digit));
		}
	}
	return products.reduce((a, n) => a + n, 0);
};

const buildBlocks = (diskMap: string[]) => {
	const defrag = [];
	for (const [idx, size] of diskMap.entries()) {
		const type = idx % 2 === 0 ? "file" : "space";

		for (let i = 0; i < Number(size); i++) {
			type === "file" ? defrag.push(`${idx / 2}`) : defrag.push(".");
		}
	}
	return defrag;
};

export function partOne(input: string) {
	const diskMap = parse(input);
	const blocks = buildBlocks(diskMap);

	let times = blocks.length;
	while (times >= 0) {
		if (!blocks.includes(".")) {
			break;
		}
		const n = blocks.pop();
		if (n === ".") {
			continue;
		}
		const i = blocks.findIndex(isSpace);
		blocks.splice(i, 1, n);
		times--;
	}
	return checksum(blocks);
}

function build(diskMap) {
	const blocks = [];
	const fileMap = new Map();
	const spaceMap = new Map();

	for (const [idx, val] of diskMap.entries()) {
		const type = idx % 2 === 0 ? "file" : "space";
		const size = Number(val);
		const id = Math.ceil(idx / 2);

		for (let i = 0; i < size; i++) {
			if (type === "file") {
				if (!fileMap.has(id)) {
					fileMap.set(id, { size, idx: blocks.length });
				}
				blocks.push(`${idx / 2}`);
			} else {
				if (!spaceMap.has(id - 1)) {
					spaceMap.set(id - 1, { size, idx: blocks.length });
				}
				blocks.push(".");
			}
		}
	}

	const files = [];
	const spaces = [];
	for (const [key, value] of fileMap.entries()) {
		files.push({ id: key, size: value.size, idx: value.idx });
	}
	for (const [_, value] of spaceMap.entries()) {
		spaces.push({ size: value.size, idx: value.idx });
	}
	return { files, spaces, blocks };
}

export function partTwo(input: string) {
	const diskMap = parse(input);
	const { files, spaces, blocks } = build(diskMap);

	for (const file of files.reverse()) {
		for (let i = 0; i < spaces.length; i++) {
			const space = spaces[i];
			if (space.idx > file.idx) {
				break;
			}
			if (space && file.size <= space.size) {
				file.idx = space.idx;
				space.size = space.size - file.size;
				space.idx = space.idx + file.size;
				break;
			}
		}
	}

	const defrag = new Array(blocks.length).fill(".");
	for (const file of files) {
		for (let i = 0; i < file.size; i++) {
			defrag[file.idx + i] = `${file.id}`;
		}
	}
	return checksum(defrag);
}

export const parse = (input: string) => input.split("");
