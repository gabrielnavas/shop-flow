import { differenceInDays } from 'date-fns';

export const distanceFrom = (date: Date) => {
  const hoje = new Date();
  const diffDays = differenceInDays(hoje, date);

  if (diffDays === 0) {
    return 'hoje';
  } else if (diffDays === 1) {
    return 'há 1 dia';
  } else {
    return `há ${diffDays} dias`;
  }
};
