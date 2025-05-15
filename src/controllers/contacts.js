import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { createContact } from '../services/contacts.js';

import { updateContact } from '../services/contacts.js';
import { deleteContact } from '../services/contacts.js';
export const getContactsController = async (req, res) => {
  const contact = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact with id {contactId}!',
    data: contact,
  });
};
export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    //   if (!contact) {
    //     res.status(404).json({ message: 'Contact not found' });
    //     return;
    //   }
    if (!contact) {
      // next(new Error('Contact not found'));
      // return;
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      // status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
