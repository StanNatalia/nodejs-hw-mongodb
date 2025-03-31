import ContactsCollection from '../db/Model/contactsmodel.js';

export const getContacts = () => ContactsCollection.find();

export const getContactsById = (contactId) =>
  ContactsCollection.findOne({ _id: contactId });
