const parseHourAMPM = (hour) => (hour > 12 ? hour - 12 : hour);

export default parseHourAMPM;
