function hasMatch(pattern: string, design: string, idx: number) {
	if (idx + pattern.length > design.length) return false;

	for (let i = 0; i < pattern.length; i++) {
		if (pattern[i] !== design[idx + i]) return false;
	}

	return true;
}

function possibleMatches(patterns: string[], design: string): number {
	const hist = Array(design.length + 2).fill(0);
	hist[0] = 1;
	for (let idx = 0; idx < design.length; idx++)
		if (hist[idx] > 0) {
			for (const pattern of patterns) {
				if (hasMatch(pattern, design, idx)) {
					hist[idx + pattern.length] += hist[idx];
				}
			}
		}

	return hist[design.length];
}

export function partOne(input: string) {
	const { patterns, designs } = parse(input);
	let count = 0;

	for (const design of designs) {
		if (possibleMatches(patterns, design) > 0) {
			count++;
		}
	}

	return count;
}

export function partTwo(input: string) {
	const { patterns, designs } = parse(input);
	let total = 0;
	for (const design of designs) {
		const count = possibleMatches(patterns, design);
		if (count > 0) {
			total += count;
		}
	}
	return total;
}

export function parse(input: string) {
	const [patterns, designs] = input.split("\n\n");
	return {
		patterns: patterns.split(",").map((it) => it.trim()),
		designs: designs.trim().split("\n"),
	};
}
