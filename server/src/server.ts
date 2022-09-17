import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// List all games
app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

// Create a new Ad
app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});

// List all game ads
app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      hourEnd: true,
      hourStart: true,
      name: true,
      useVoiceChannel: true,
      weekDays: true,
      yearsPlaying: true,
    },
    where: { gameId: gameId },
    orderBy: { createdAt: 'desc' },
  });

  const adsFormatted = ads.map((ad) => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd),
  }));

  return res.json(adsFormatted);
});

// Gets discord from an ad
app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: { discord: true },
    where: { id: adId },
  });

  return res.json({ discord });
});

app.listen(3333);
