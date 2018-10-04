/**
 * @typedef {object} Birthdate
 * @property {string} birthdate.year
 * @property {string} birthdate.mon
 * @property {string} birthdate.mday
 */

 /**
 * Adapts the birth date format output format of the
 * REY Birthdoc app to a Date object
 * @param {Birthdate} birthdate
 * @returns {Date}
 */
function birthDateToDate(birthdate) {
  return new Date(birthdate.year, birthdate.mon, birthdate.mday);
}

/**
 * Returns the age difference of the given app 
 * @param {Date} date
 * @returns {number}
 */
function dateToAge(date) {
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
}

/**
 * Returns the 10-year age group that the provided age
 * belongs to. Exceptions to the rule are new borns(00)
 * and elderly people (85+)
 * 
 * @example
 * assert.equal(ageToAgeGroup(43), "40-50");
 * assert.equal(ageToAgeGroup(25), "20-30");
 * assert.equal(ageToAgeGroup(0), "00");
 * assert.equal(ageToAgeGroup(86), "85+");
 *
 * @param {number} age
 * @return {string} 
 */
function ageToAgeGroup(age) {
  const groupLen = 10;
  if (age < 0) {
    throw new TypeError("negative ages are not valid");
  }
  if (age >= 85) {
    return "85+"; 
  } else if (age == 0) {
    return "00";
  } else {
    const lower = Math.floor(age / groupLen) * groupLen;
    const upper = Math.ceil(age / groupLen) * groupLen;
    return `${lower}-${upper}`;
  }
}

/**
 * Returns the age group for the given date in birthdate format
 * @param {Birthdate} birthdate
 * @returns {string}
 */
function birthDateToAgeGroup(birthdate) {
  const birthday = birthDateToDate(birthdate);
  const age = dateToAge(birthday);
  const ageGroup = ageToAgeGroup(age);
  return ageGroup;
}

module.exports = {
  birthDateToDate,
  dateToAge,
  ageToAgeGroup,
  birthDateToAgeGroup,
}
