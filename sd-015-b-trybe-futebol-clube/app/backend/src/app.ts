import express from 'express';
import loginRoute from './routes/loginRoute';
import teamRoute from './routes/teamsRoute';
import matchesRoute from './routes/matchesRoute';
import leaderboardsHomeRoute from './routes/lBHomeRoute';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.routes();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    // ...
  }

  private routes():void {
    this.app.use('/login', loginRoute);
    this.app.use('/teams', teamRoute);
    this.app.use('/matches', matchesRoute);
    this.app.use('/leaderboard', leaderboardsHomeRoute);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Ouvindo na Porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
