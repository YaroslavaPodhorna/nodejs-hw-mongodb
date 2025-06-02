import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';

export async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (typeof authorization !== 'string') {
      throw createHttpError.Unauthorized('Please provide access token');
    }

    const [bearer, accessToken] = authorization.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      throw createHttpError.Unauthorized('Invalid token format');
    }

    const session = await SessionCollection.findOne({ accessToken });

    if (!session) {
      throw createHttpError.Unauthorized('Session not found');
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      throw createHttpError.Unauthorized('Access token expired');
    }

    const user = await UserCollection.findById(session.userId);

    if (!user) {
      throw createHttpError.Unauthorized('User not found');
    }

    req.user = { id: user._id, email: user.email, name: user.name };
    next();
  } catch (error) {
    next(error);
  }
}
