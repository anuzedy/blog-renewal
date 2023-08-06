export function sanityTimeFormat(date: string) {
  date = date.replace('T', ' ').replace('Z', '');
  return date;
}