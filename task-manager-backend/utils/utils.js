module.exports = {
  dateValidator: (dateString) => {
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
    return dateRegex.test(dateString);
  },
  dateConverter: (dateString) => {
    const formattedDays = dateString.split("-");
    const epochTime = new Date(formattedDays[2], formattedDays[1] - 1, formattedDays[0]);
    return epochTime;
  }
}