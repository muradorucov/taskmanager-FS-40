export function dateFormat(_date) {
  const date = new Date(_date);
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
  ];
  const formatted =
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
  return formatted
}