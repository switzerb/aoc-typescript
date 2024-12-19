import { cloneDeep } from "lodash";

type Computer = {
	A: bigint;
	B: bigint;
	C: bigint;
	instr: number[];
};

const opcodes = ["adv", "bxl", "bst", "jnz", "bxc", "out", "bdv", "cdv"];

export function partOne(computer: Computer) {
	const { A, B, C, instr } = computer;
	let p = 0;

	let current = {
		A,
		B,
		C,
		output: [],
	};

	const combo = (operand: number, register): bigint => {
		if ([0, 1, 2, 3].includes(operand)) return BigInt(operand);
		switch (operand) {
			case 4:
				return register.A;
			case 5:
				return register.B;
			case 6:
				return register.C;
			case 7:
				throw new Error("Invalid combo");
		}
	};

	while (p < instr.length) {
		const next = cloneDeep(current);
		try {
			const [code, operand] = [instr[p], instr[p + 1]];
			const opcode = opcodes[code];
			switch (opcode) {
				case "adv": {
					next.A = BigInt(next.A / 2n ** combo(operand, next));
					break;
				}
				case "bxl": {
					next.B = next.B ^ BigInt(operand);
					break;
				}
				case "bst": {
					next.B = combo(operand, next) % 8n;
					break;
				}
				case "jnz": {
					p = next.A !== 0n ? operand : p + 2;
					break;
				}
				case "bxc": {
					next.B = next.B ^ next.C;
					break;
				}
				case "out": {
					next.output.push(combo(operand, next) % 8n);
					break;
				}
				case "bdv": {
					next.B = BigInt(next.A / 2n ** combo(operand, next));
					break;
				}
				case "cdv": {
					next.C = BigInt(next.A / 2n ** combo(operand, next));
					break;
				}
			}
			if (opcode !== "jnz") p += 2;
			current = next;
		} catch (err) {
			console.log(err);
			throw new Error("You've run off the end of the instructions");
		}
	}

	return current.output.join(",");
}

function run(A: bigint, instr: number[]) {
	return partOne({
		A,
		B: 0n,
		C: 0n,
		instr,
	});
}

export function partTwo(expected: number[]) {
	let register = 0n;
	for (let len = expected.length - 1; len >= 0; len--) {
		register *= 8n;
		const currTarget = expected.slice(len).join(",");
		while (true) {
			const curr = run(register, expected);
			if (curr === currTarget) break;
			register++;
		}
	}
	return register;
}
