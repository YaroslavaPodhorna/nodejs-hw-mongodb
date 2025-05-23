import e from 'express';
import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const [contacts, total] = await Promise.all([
    Contact.find(filter)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
    Contact.countDocuments(filter),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const updateContact = async (contactId, payload) => {
  const contact = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    new: true,
  });
  return contact;
};
export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId });
  return contact;
};
