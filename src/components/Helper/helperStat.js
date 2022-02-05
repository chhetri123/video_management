exports.getCount = (data) => {
  return data >= 1000000
    ? Math.floor(data / 1000000) + "M"
    : data > 1000
    ? Math.floor(data / 1000) + "K"
    : data;
};
exports.getDate = (date) => {
  const diffDay = (Date.now() - new Date(date).getTime()) / (1000 * 3600 * 24);
  return diffDay > 365
    ? Math.floor(diffDay / 365) + " years ago"
    : diffDay > 30
    ? Math.floor(diffDay / 30) + " months ago"
    : diffDay > 7
    ? Math.floor(diffDay / 7) + " weeks ago"
    : Math.floor(diffDay) + " days ago";
};
