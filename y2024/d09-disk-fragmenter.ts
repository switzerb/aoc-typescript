import { cloneDeep } from "lodash";

const isSpace = (digit) => digit === ".";

const checksum = (diskmap: string[]) => {
	const products = [];
	for (const [idx, digit] of diskmap.entries()) {
		products.push(idx * Number(digit));
	}
	return products.reduce((a, n) => a + n, 0);
};

const buildBlocks = (diskMap: string[], ids?: number[]) => {
	let id = 0;
	const defrag = [];
	for (const [idx, digit] of diskMap.entries()) {
		const type = idx % 2 === 0 ? "file" : "free";
		let count = 0;
		while (count < Number(digit)) {
			type === "file"
				? ids?.length
					? defrag.push(`${ids[id]}`)
					: defrag.push(`${id}`)
				: defrag.push(".");
			count++;
		}
		if (type === "file") {
			id++;
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

function partition(diskMap: string[]) {
	const files = [];
	const free = [];
	for (const [idx, digit] of diskMap.entries()) {
		idx % 2 === 0 ? files.push(digit) : free.push(digit);
	}
	return [files.reverse(), free];
}

export function partTwo(input: string) {
	const diskMap = parse(input).map((n) => Number(n));
	const defrag = cloneDeep(diskMap);
	const ids = [...Array(Math.floor(diskMap.length / 2 + 1)).keys()];
	let blockId = ids.length - 1;
	let nope = 2;

	while (diskMap.length > 0) {
		const firstLoop = diskMap.length === defrag.length;
		const fileSize = diskMap.pop(); // get the next file to move
		diskMap.pop(); // ignore the free space

		// scan for free space as all odd indexes
		for (let idx = 1; idx < defrag.length; idx += 2) {
			if (idx < defrag.length - nope) {
				const iterations = Math.ceil(idx / 2);
				if (fileSize <= defrag[idx]) {
					// change the id map to move the id
					ids.splice(iterations, 0, blockId);
					ids.splice(ids.lastIndexOf(blockId), 1);

					// splice in the new file and free space
					const spaceSize = defrag.at(idx);
					defrag.splice(idx, 1, ...[0, fileSize, spaceSize - fileSize]);
					defrag.splice(
						-nope,
						firstLoop ? 2 : 3,
						defrag.at(-nope) + fileSize + (defrag.at(-nope - 2) ?? 0),
					);
					nope += 3;
					break;
				}
			}
		}
		blockId--;
	}
	// expected [2,0,2,0,1,0,3,0,3,1,2,1,3,4,4,1,4,5,4,2]

	// actual [2,0,2,0,1,0,3,0,3,0,1,1,3,1,7,1,4,5,4,3]

	// 00992111777.44.333....5555.6666.....8888..
	const blocks = buildBlocks(
		defrag.map((n) => String(n)),
		ids,
	);
	return checksum(blocks);
}

export const parse = (input: string) => input.split("");
