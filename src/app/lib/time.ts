export function sanityTimeFormat(date: string) {
  date = date.replace('T', ' ').replace('Z', '');
  const splitDate = date.split(' ')[0];
  return splitDate;
}