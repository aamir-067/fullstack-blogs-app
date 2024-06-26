// function which convert unix timestamp into a time formate of 02 MAR 2024.
export function unixTimestampToString(timestamp: number): string {
	const date = new Date(timestamp * 1000); // convert seconds to milliseconds
	const monthNames = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	const day = date.getDate().toString().padStart(2, "0");
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear().toString();

	return `${day} ${month} ${year}`;
}
