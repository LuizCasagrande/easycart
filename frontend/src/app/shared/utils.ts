export function getNowPlusDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
