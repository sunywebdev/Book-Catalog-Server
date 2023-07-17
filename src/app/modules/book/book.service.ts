import ApiError from '../../../errors/ApiError';
import { iBook } from './book.interface';
import Book from './book.model';

export const createBookDB = async (data: iBook): Promise<iBook> => {
  const result = await Book.create(data);

  return result;
};

export const getBooksDB = async (query: any): Promise<iBook[] | null> => {
  const initialQuery = [];

  if (query.search) {
    initialQuery.push({
      $or: [
        { name: { $regex: new RegExp(query.search, 'i') } },
        { author: { $regex: new RegExp(query.search, 'i') } },
      ],
    });
  }
  if (query.genre) {
    initialQuery.push({ genre: query.genre });
  }
  if (query.publicationDate) {
    initialQuery.push({
      $expr: { $eq: [{ $year: '$publicationDate' }, query.publicationDate] },
    });
  }

  query = initialQuery.length > 0 ? { $and: initialQuery } : {};

  const result = await Book.find(query);
  if (!result) throw new ApiError(404, 'Not found.');

  return result;
};

export const getBookDB = async (id: string): Promise<iBook | null> => {
  const result = await Book.findById(id);
  if (!result) throw new ApiError(404, 'Not found.');

  return result;
};

export const updateBookDB = async (
  id: string,
  data: Partial<iBook>
): Promise<iBook | null> => {
  const result = await Book.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });

  return result;
};

export const deleteBookDB = async (id: string): Promise<iBook | null> => {
  const result = await Book.findByIdAndDelete(id);

  return result;
};
