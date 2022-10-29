import { z } from 'zod';
import { VehicleZodSchema } from './VehicleInterface';

export const carZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).gte(2, {
    message: 'doorsQty must be greater than or equal 2',
  }).lte(4, {
    message: 'doorsQty must be less than or equal 4',
  }),
  seatsQty: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).gte(2, {
    message: 'seatsQty must be greater than or equal 2',
  }).lte(7, {
    message: 'seatsQty must be less than or equal 7',
  }),
}); 

export type Car = z.infer<typeof carZodSchema>;
