// `_`  is the placeholder for spaces
// `%`  is the placeholder for a separator, which could be a comma or linebreak
const formats = {
	CA: '{address}%{address2}%{city}%{state}%{country}%{zip}',
	GB: '{address}%{address2}%{city}%{state}%{zip}%{country}',
	US: '{address}%{address2}%{city}%{state}%{zip}%{country}',
	ZZZ: '{address}%{address2}%{city}%{state}%{zip}%{country}',
};

export const addressFormatter = (
	format: string,
	address: string,
	address2: string,
	city: string,
	state: string,
	country: string,
	countryISO: string,
	zip: string,
	separator = ','
) => {
	let addressFormat = format;
	if (!addressFormat) {
		addressFormat = formats?.[countryISO] ? formats[countryISO] : formats.ZZZ;
	}
	// first replace variable placeholders with values
	addressFormat = addressFormat.replace('{address}', address);
	addressFormat = addressFormat.replace('{address2}', address2);
	addressFormat = addressFormat.replace('{city}', city);
	addressFormat = addressFormat.replace('{state}', state);
	addressFormat = addressFormat.replace('{country}', country);
	addressFormat = addressFormat.replace('{zip}', zip);

	// break address apart anywhere a separator exists
	const chunks = addressFormat.split('%').map((fields: string) => {
		// now process each chunk by splitting again, but this time anywhere a space placeholder exists
		const placeholders = fields.split('_');
		// we should be down to individual address fields, but those need to be cleaned up
		placeholders.map((placeholder: string) => placeholder.trim());
		// remove any empty fields then rejoin them with an actual space
		return placeholders.filter(Boolean).join(' ');
	});

	// now figure out what our separator is
	let sep = separator ? separator : ',';
	// remove any spaces then add a space (so we don't end up with multiple spaces)
	sep = sep.trim() + ' ';
	// FINALLY... remove any empty chunks then rejoin all of our field chunks using our separator
	return chunks.filter(Boolean).join(sep);
};
