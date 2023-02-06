let currentDate = new Date();
let year = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let query;
query = {
  date: {
    $gte: new Date(year, currentMonth, 1),
    $lt: new Date(year, currentMonth + 1, 1),
  },
};
export default query