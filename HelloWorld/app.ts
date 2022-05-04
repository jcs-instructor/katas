import express from "express";
import { MobTimer } from './mobTimer';

export function makeApp() {
  const app = express()
  const mobTimer = new MobTimer();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send(mobTimer.state);
  });

  app.post('/', (req, res) => {
    const data = req.body;
    mobTimer.durationMinutes = Number(data.durationMinutes);

    // mobTimer.durationMinutes = data.durationMinutes || mobTimer.durationMinutes;
    res.send(mobTimer.state);
  });

  app.get('/start', (req, res) => {
    mobTimer.start();
    res.send(mobTimer.state);
  });

  app.get('/pause', (req, res) => {
    mobTimer.pause();
    res.send(mobTimer.state);
  });

  app.get('/resume', (req, res) => {
    mobTimer.resume();
    res.send(mobTimer.state);
  });

  return app;
};
