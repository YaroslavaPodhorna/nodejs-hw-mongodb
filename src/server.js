import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
// import { getAllContacts, getContactById } from './services/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';
const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });

  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContacts();
  //   res
  //     .status(200)
  //     .json({ message: 'Successfully found contacts!', data: contacts });
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   const contact = await getContactById(contactId);
  //   if (!contact) {
  //     res.status(404).json({ message: 'Contact not found' });
  //     return;
  //   }
  //   res.status(200).json({
  //     message: 'Successfully found contact with id {contactId}!',
  //     data: contact,
  //   });
  // });
  app.use(contactsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
