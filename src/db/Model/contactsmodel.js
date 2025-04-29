import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: typeList[2],
      minlength: 3,
      maxlength: 20,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', handleSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
contactsSchema.post('findOneAndUpdate', handleSaveError);

export const contactSortField = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

const ContactsCollection = model('contacts', contactsSchema);
export default ContactsCollection;
