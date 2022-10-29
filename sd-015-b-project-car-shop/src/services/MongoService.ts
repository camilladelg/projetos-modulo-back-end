import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

abstract class MongoService<T> {
  constructor(protected model: Model<T>) {}

  public create = (obj: T): Promise<T | null | ServiceError> => 
    this.model.create(obj);

  public read = (): Promise<T[]> => this.model.read();

  public readOne = (id: string): Promise<T | null | ServiceError> =>
    this.model.readOne(id);

  public update = (id: string, obj: T): Promise<T | null | ServiceError> =>
    this.model.update(id, obj);

  public delete = (id: string): Promise<T | null | ServiceError> =>
    this.model.delete(id);
}

export default MongoService;