import {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import createHttpError from 'http-errors';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseContactFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user.id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const photo = req.file;
    const contactData = {
      ...req.body,
      userId: req.user.id,
    };

    if (photo) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      const photoUrl = useCloudinary
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);

      contactData.photo = photoUrl;
    }

    const contact = await createContact(contactData);

    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const photo = req.file;

    const updateData = { ...req.body };

    if (photo) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      const photoUrl = useCloudinary
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);
      updateData.photo = photoUrl;
    }

    const updatedContact = await updateContact(
      contactId,
      updateData,
      req.user.id,
    );

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
  const deletedContact = await deleteContact(contactId, req.user.id);
  if (!deletedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(204).send();
};
