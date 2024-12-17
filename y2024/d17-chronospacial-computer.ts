import { cloneDeep } from "lodash";

type Computer = {
	A: number;
	B: number;
	C: number;
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

	const combo = (operand: number, register) => {
		if ([0, 1, 2, 3].includes(operand)) return operand;
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
					next.A = Math.trunc(next.A / 2 ** combo(operand, next));
					break;
				}
				case "bxl": {
					next.B = next.B ^ operand;
					break;
				}
				case "bst": {
					next.B = combo(operand, next) % 8;
					break;
				}
				case "jnz": {
					p = next.A !== 0 ? operand : p + 2;
					break;
				}
				case "bxc": {
					next.B = next.B ^ next.C;
					break;
				}
				case "out": {
					next.output.push(combo(operand, next) % 8);
					break;
				}
				case "bdv": {
					next.B = Math.trunc(next.A / 2 ** combo(operand, next));
					break;
				}
				case "cdv": {
					next.C = Math.trunc(next.A / 2 ** combo(operand, next));
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
