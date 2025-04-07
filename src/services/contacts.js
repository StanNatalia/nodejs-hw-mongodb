import ContactsCollection from '../db/Model/contactsmodel.js';

export const getContacts = () => ContactsCollection.find();

export const getContactsById = (contactId) =>
  ContactsCollection.findOne({ _id: contactId });

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContacts = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id },
    payload,
    {
      new: true,
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

export const deleteContactById = (_id) =>
  ContactsCollection.findOneAndDelete({ _id });
