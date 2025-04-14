import { sortList } from '../constants/index.js';
import { contactSortField } from '../db/Model/contactsmodel.js';

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortList.includes(sortOrder)
    ? sortOrder
    : sortList[0];

  const parsedSortBy = contactSortField.includes(sortBy) ? sortBy : 'name';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
