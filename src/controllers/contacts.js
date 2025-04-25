import {
  addContact,
  getContacts,
  getContactsById,
  updateContacts,
  deleteContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

import { contactSortField } from '../db/Model/contactsmodel.js';

import { parseSortParams } from '../utils/parseSortParams.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseContactFilterParams } from '../utils/filter/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortField);
  const filters = parseContactFilterParams(req.query);
  filters.userId = req.user._id;
  const { _id: userId } = req.user;
  const data = await getContacts({
    userId,
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactsById(contactId, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully added contact',
    data,
  });
};

export const upsetContactsController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { data, isNew } = await updateContacts(
    id,
    req.body,
    { upsert: true },
    userId,
  );
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully update contacts',
    data,
  });
};

export const patchContactsController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContacts(contactId, req.body, {}, userId);

  if (!result) {
    throw createHttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.json({
    status: 200,
    message: 'Successfully update contacts',
    data: result.data,
  });
};

export const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContactById(contactId, userId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }
  res.status(204).send();
};
