const formatDate  = (rawDate) => {
	const _date = new Date(rawDate.toNumber()*1000); // to milliseconds
	const date = `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`;
	const time = `${_date.getHours()}:${_date.getMinutes()}`;
	return `${date}-${time}`;

};

export { formatDate }
