export function partOne(input: string) {
	const secrets = parse(input);
	const generated = [];

	for (const init of secrets) {
		let secret: bigint = BigInt(init);
		for (let count = 1; count <= 2000; count++) {
			secret = calcSecret(secret);
		}
		generated.push(secret);
	}

	return Number(generated.reduce((a, n) => a + n));
}

function calcSecret(secret: bigint): bigint {
	const r = secret << 6n;
	secret = r ^ secret; // mix
	secret = secret % 16777216n; // prune

	const r2 = secret >> 5n;
	secret = r2 ^ secret; // mix
	secret = secret % 16777216n; // prune

	const r3 = secret << 11n;
	secret = r3 ^ secret; // mix
	return secret % 16777216n; // prune
}

export function partTwo(input) {
	const secrets = parse(input);
	const monkeyBusiness = new Map<string, number>();

	for (const init of secrets) {
		let secret: bigint = BigInt(init);
		const diffs = [];
		const visited = new Set<string>();
		let prev = Number(secret % 10n);

		for (let i = 0; i < 2000; i++) {
			secret = calcSecret(secret);

			const price = Number(secret % 10n);
			diffs.push(price - prev);
			prev = price;

			if (i >= 3) {
				const key = [diffs[i - 3], diffs[i - 2], diffs[i - 1], diffs[i]].join();
				if (!visited.has(key)) {
					monkeyBusiness.set(
						key,
						monkeyBusiness.has(key) ? monkeyBusiness.get(key) + price : price,
					);
				}
				visited.add(key);
			}
		}
	}

	return Math.max(...monkeyBusiness.values());
}

const parse = (input: string) =>
	input
		.trim()
		.split("\n")
		.map((n) => Number(n));
