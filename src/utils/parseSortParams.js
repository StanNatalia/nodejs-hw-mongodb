import { sortList } from '../constants.js';
import { contactSortField } from '../db/Model/contactsmodel.js';

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortList.includes(sortOrder)
    ? sortOrder
    : sortList[0];

  const parsedSortBy = contactSortField.includes(sortBy ? sortBy : '_id');

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
