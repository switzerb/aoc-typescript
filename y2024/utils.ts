/** Shamelessly stolen from
 *. https://github.com/ArrayKnight/advent-of-code/blob/main/src/utils.ts#L163
 *  because it is a very handy utility
 */
export const TimeUtils = {
	log: <T>(callback: () => T, label = "runtime") => {
		console.time(label);

		const result = callback();

		console.timeEnd(label);

		return result;
	},
};
