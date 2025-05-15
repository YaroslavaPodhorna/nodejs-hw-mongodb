import { HttpError } from 'http-errors';
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
// {
// 		status: 500,
// 		message: "Something went wrong",
// 		data:
// 		// конкретне повідомлення про помилку, отримане з об'єкта помилки
// }
