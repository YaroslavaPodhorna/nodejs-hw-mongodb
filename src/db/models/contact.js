import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true },
);
export const Contact = mongoose.model('Contact', contactSchema);
// name - string, required
// phoneNumber - string, required
// email - string
// isFavourite - boolean, default false
// contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’

// Для автоматичного створення полів createdAt та updatedAt, можна використати параметр timestamps: true при створенні моделі. Це додає до об'єкту два поля: createdAt (дата створення) та updatedAt (дата оновлення), і їх не потрібно додавати вручну.
