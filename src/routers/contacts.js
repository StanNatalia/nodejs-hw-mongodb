import { Router } from 'express';
import {
  getContactsBuIdController,
  getContactsController,
  addContactController,
  upsetContactsController,
  patchContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsBuIdController));

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.put('/:contactId', ctrlWrapper(upsetContactsController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactsController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));

export default contactsRouter;
