export function getFormattedDate(date) {
  return new Date(date).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getDateMinusDays(from, days) {
  const date = new Date(from);
  date.setDate(date.getDate() - days);
  return date;
}
