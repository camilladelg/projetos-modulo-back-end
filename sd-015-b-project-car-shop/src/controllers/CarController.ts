import { Request, Response } from 'express';
import MongoController,
{ RequestWithBody,
  ResponseError,
} from './MongoController';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';
import { ServiceError } from '../services/MongoService';

class CarController extends MongoController<Car> {
  private _route: string;

  constructor(public service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const car = await this.service.create(body) as Car | ServiceError;
      // if (!car) {
      //   return res.status(500).json({ error: this.erros.internal });
      // }

      if ('error' in car) {
        return res.status(400).json({ error: car.error.issues[0].message });
      }

      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }

      const car = await this.service.readOne(id);
      return car 
        ? res.status(200).json(car)
        : res.status(404).json({ error: this.erros.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  // verifyId = async (id: string) => {
  //   if (!id) return { code: 400, error: this.erros.requiredId };
  //   if (id.length < 24) return { code: 400, error: this.erros.idLength };
  // };

  public update = async (
    req: Request,
    res: Response<Car | ResponseError>,
  ): Promise <typeof res> => {
    try {
      const { id } = req.params;
      // if (!id) return res.status(400).json({ error: this.erros.requiredId });
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      // const { body } = req;

      const car = await this.service.update(id, req.body);

      if (!car) return res.status(404).json({ error: this.erros.notFound });
      if ('error' in car) {
        return res.status(400).json({ 
          error: car.error.issues[0].message });
      }
      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  public delete = async (
    req: Request,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      const car = await this.service.delete(id);

      return car
        ? res.status(204).json(car)
        : res.status(404).json({ error: this.erros.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };
}

export default CarController;
