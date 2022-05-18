export function isInTheFuture(date) {
  const today = new Date();
  return date > today;
}
