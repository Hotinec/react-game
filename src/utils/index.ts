export const getRandomNumber = (
  { min = 0, max = Number.MAX_SAFE_INTEGER }
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addZero = (number: number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  const year = addZero(dateObj.getFullYear());
  const month = addZero(dateObj.getMonth() + 1);
  const day = addZero(dateObj.getDate());
  const hours = addZero(dateObj.getHours());
  const min = addZero(dateObj.getMinutes());
  const sec = addZero(dateObj.getSeconds());

  return (`${day}/${month}/${year} ${hours}:${min}:${sec}`);
};
