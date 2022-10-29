import MongoService, { ServiceError } from './MongoService';
import CarModel from '../models/CarModel';
import { Car, carZodSchema } from '../interfaces/CarInterface';

class CarService extends MongoService<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  public create = async (obj: Car): Promise<Car | null | ServiceError> => {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  public update = async (
    id: string,
    obj: Car,
  ): Promise<Car | null | ServiceError> => {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, obj);
  };
}

export default CarService;