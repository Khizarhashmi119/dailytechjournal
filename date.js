const date = () => {
  let date = new Date();
  let option = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-us", option);
};

module.exports = date;
