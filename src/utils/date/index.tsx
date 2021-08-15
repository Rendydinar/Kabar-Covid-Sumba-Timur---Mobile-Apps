export const getChatTime = (date: any) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour > 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = (dateParam: any) => {
  const year = dateParam.getFullYear();
  const month = dateParam.getMonth();
  const date = dateParam.getDate();

  return `${year}-${month + 1}-${date}`;
};

export const formatDate = (date: any): string => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
};
