// ----------------------------------------------------------------------

export const ratios = {
	"4/3": 4 / 3,
	"3/4": 3 / 4,
	"6/4": 6 / 4,
	"4/6": 4 / 6,
	"16/9": 16 / 9,
	"9/16": 9 / 16,
	"21/9": 21 / 9,
	"9/21": 9 / 21,
	"1/1": 1,
} as const;

export function getRatio(ratio: keyof typeof ratios = "4/3") {
	return ratios[ratio];
}
