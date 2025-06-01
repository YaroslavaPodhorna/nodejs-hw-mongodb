import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';
export async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (typeof authorization !== 'string') {
    return next(
      new createHttpError.Unauthorized('Please provide access token'),
    );
  }
  const [bearer, accessToken] = authorization.split(' ');
  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(
      new createHttpError.Unauthorized('Please provide access token'),
    );
  }
  const session = await SessionCollection.findOne({ accessToken });
  if (session === null) {
    return next(new createHttpError.Unauthorized('Session not found'));
  }
  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(new createHttpError.Unauthorized('Access token expired'));
  }
  const user = await UserCollection.findById(session.userId);
  if (!user) {
    return next(new createHttpError.Unauthorized('User not found'));
  }
  req.user = { id: user._id, email: user.email, name: user.name };
  next();
}
