import { Request, Response } from 'express';
import MongoService from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request{
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
  idLength = 'Id must have 24 hexadecimal characters',
}

abstract class MongoController<T> {
  abstract route: string;

  protected erros = ControllerErrors;

  constructor(protected service: MongoService<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();
      
      return res.status(200).json(cars);
    } catch (err) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    _req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}

export default MongoController;