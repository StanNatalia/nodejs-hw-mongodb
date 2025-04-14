import { typeList } from '../../constants/contacts.js';

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    if (value.toLocaleLowerCase() === 'true') return true;
    if (value.toLocaleLowerCase() === 'false') return false;
  }

  return undefined;
};

export const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = typeList.includes(type) ? type : undefined;
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
