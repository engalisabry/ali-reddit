import { z } from 'zod';

export const postValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'The title must be more than 3 characters ' })
    .max(128, { message: 'title must be less than 128 characters' }),
  subredditId: z.string(),
  content: z.any(),
});

export type postCreationRequest = z.infer<typeof postValidator>;
