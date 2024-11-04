export enum days {
  'понедельник' = 1,
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
  'воскресение',
}

export function dayOfWeek() {
  const date: Date = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleString('ru-RU', options);
}
