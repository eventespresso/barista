import * as R from 'ramda';

const hasTypeAsText = R.propEq('type', 'TEXT');
const hasMapsToAsFName = R.propEq('mapsTo', 'Attendee.fname');
const hasTypeAsTextAndMapsToAsFName = R.allPass([hasTypeAsText, hasMapsToAsFName]);
/**
 * Given a list of elements, it returns a boolean indicating whether there is
 * an element which maps to 'Attendee.fname'
 */
export const hasAnElementAsAttendeeFName = R.any(hasTypeAsTextAndMapsToAsFName);

const hasTypeAsEmail = R.propEq('type', 'EMAIL');
const hasMapsToAsEmail = R.propEq('mapsTo', 'Attendee.email');
const hasTypeAsEmailAndMapsToAsEmail = R.allPass([hasTypeAsEmail, hasMapsToAsEmail]);
/**
 * Given a list of elements, it returns a boolean indicating whether there is
 * an element which maps to 'Attendee.email'
 */
export const hasAnElementAsAttendeeEmail = R.any(hasTypeAsEmailAndMapsToAsEmail);
