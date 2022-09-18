import { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { Input } from './components/Form/Input';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        is here.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Create a new post
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Which game?
                </label>
                <Input
                  id="game"
                  placeholder="Select the game that you want to play"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">How do you want to be called?</label>
                <Input id="name" placeholder="Your nickname" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Years of experience</label>
                  <Input
                    id="yearsPlaying"
                    type="number"
                    placeholder="It's ok if it is zero"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">What's your Discord?</label>
                  <Input id="discord" placeholder="User#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">When do you play?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Sunday"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Monday"
                    >
                      M
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Tuesday"
                    >
                      T
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Wednesday"
                    >
                      W
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Thursday"
                    >
                      T
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Friday"
                    >
                      F
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Saturday"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">At what time?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="From" />
                    <Input type="time" placeholder="To" />
                  </div>
                </div>
              </div>

              <label htmlFor="checkbox" className="mt-2 flex gap-2 text-sm">
                <Input id="checkbox" type="checkbox" />
                I'm used to connect to voice chat
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Find duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
