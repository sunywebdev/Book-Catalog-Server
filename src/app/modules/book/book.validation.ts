import { z } from 'zod';

const addBookSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    summary: z.string({
      required_error: 'summary is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
    banner: z.string({
      required_error: 'Banner is required',
    }),
    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const BookValidation = {
  addBookSchema,
};
