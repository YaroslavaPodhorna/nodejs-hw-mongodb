import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  if (!isValidObjectId(req.params.contactId)) {
    return next(
      createHttpError(400, `Invalid contact id: ${req.params.contactId}`),
    );
  }
  next();
}
