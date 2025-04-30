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

import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../utils/validateBody.js';

import { upload } from '../middlewares/multer.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

import { isValid } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValid,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  upload.single('photo'),
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
  upload.single('photo'),
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactsController),
);
contactsRouter.delete(
  '/:contactId',
  isValid,
  ctrlWrapper(deleteContactsController),
);

export default contactsRouter;
