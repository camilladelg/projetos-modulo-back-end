import { z } from 'zod';

export const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).gte(
    1900, 
    { message: 'year must be greater than 1990' },
  ).lte(
    2022,
    { message: 'the year must be less than 2022' },
  ),
  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).int({ message: 'buyValue must be a integer' }),
});

export type Vehicle = z.infer<typeof VehicleZodSchema>;
