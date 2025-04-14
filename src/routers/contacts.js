import { Router } from 'express';
import {
  getContactsByIdController,
  getContactsController,
  addContactController,
  upsetContactsController,
  patchContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../utils/validateBody.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

import { isValid } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValid,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValid,
  validateBody(contactAddSchema),
  ctrlWrapper(upsetContactsController),
);

contactsRouter.patch(
  '/:contactId',
  isValid,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactsController),
);
contactsRouter.delete(
  '/:contactId',
  isValid,
  ctrlWrapper(deleteContactsController),
);

export default contactsRouter;
