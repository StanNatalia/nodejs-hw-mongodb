import ContactsCollection from '../db/Model/contactsmodel.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

import { sortList } from '../constants/index.js';

export const getContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactsCollection.find({ userId });

  if (filters.userId) {
    contactQuery.where('userId').equals(filters.userId);
  }

  if (filters.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }
  if (filters.type) {
    contactQuery.where('contactType').equals(filters.type);
  }

  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const totalItems = await ContactsCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortDirection });

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactsById = (contactId, userId) =>
  ContactsCollection.findOne({ _id: contactId, userId });

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContacts = async (_id, payload, options = {}, userId) => {
  const { upsert = false } = options;
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      new: true,
      runValidators: true,
      upsert,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id, userId) =>
  ContactsCollection.findOneAndDelete({ _id, userId });
