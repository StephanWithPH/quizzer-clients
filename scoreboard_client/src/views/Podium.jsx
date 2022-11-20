import React, { useEffect, useState } from 'react';
import Particles from 'react-particles';
import { loadFireworksPreset } from 'tsparticles-preset-fireworks';
import { useSelector } from 'react-redux';
import toastr from 'toastr';
import { User } from 'react-feather';
import Header from '../components/Header';
import crown from '../assets/crown.svg';
import Medal from '../components/Medal';
import Slider from '../components/Slider';
import fetcher from '../fetcher';

function Podium() {
  const serverURL = process.env.REACT_APP_API_URL;
  const lobbyCode = useSelector((state) => state.global.lobbyCode);
  const [podium, setPodium] = useState({
    firstPlace: [],
    secondPlace: [],
    thirdPlace: [],
  });
  const options = {
    preset: 'fireworks',
  };

  async function customInit(engine) {
    await loadFireworksPreset(engine);
  }

  useEffect(() => {
    fetcher(`${serverURL}/api/v1/scoreboard/quizzes/${lobbyCode}/teams?categorize=top3`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((resJson) => {
        setPodium(resJson);
      })
      .catch(() => {
        toastr.error('Er is een fout opgetreden!');
      });
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Particles options={options} init={customInit} />
      <Header />
      <div className="flex justify-center items-end h-full w-full">
        <div className="w-full lg:w-4/6 xl:w-3/5 2xl:w-2/5 grid grid-cols-3 items-end justify-center">
          <div className="flex z-10 flex-col h-full text-center justify-end gap-y-5">
            <h2 className="text-2xl">
              {podium.secondPlace && podium.secondPlace.map((team) => (
                <span key={team._id}>
                  {team.name}
                  <br />
                </span>
              ))}
            </h2>
            <div className="flex flex-col justify-start h-[40vh] drop-shadow-2xl bg-indigo-500 items-center rounded-t-xl pt-0 p-2">
              <Medal medalType="silver" />
              <div className="flex flex-col w-full h-full items-center pb-10 gap-y-24 justify-end">
                <p className="text-white font-bold text-5xl">2</p>
                <div className="flex flex-col sm:flex-row sm:gap-y-4 gap-x-4">
                  {podium.secondPlace.length > 0 && podium.secondPlace.filter((place) => place.image).length > 0 ? (
                    <Slider teams={podium.secondPlace} />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white border-indigo-600 font-bold border-2 flex items-center justify-center">
                      <User size={28} className="text-indigo-500" />
                    </div>
                  )}
                  <p className="flex justify-center items-center h-16 w-16 rounded-full bg-white border-indigo-600 font-bold border-2 text-indigo-500">
                    {`${podium.secondPlace.length > 0 ? podium.secondPlace[0].roundPoints : 0} RP`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex z-20 flex-col h-full text-center justify-end gap-y-5">
            <div className="flex flex-col gap-y-4 animate-bounce justify-center items-center">
              <img className="scale-[2]" alt="crown" src={crown} />
              <h2 className="relative text-3xl font-bold">
                {podium.firstPlace && podium.firstPlace.map((team) => (
                  <span key={team._id}>
                    {team.name}
                    <br />
                  </span>
                ))}
              </h2>
            </div>
            <div className="flex flex-col gap-y-5 justify-start h-[50vh] drop-shadow-2xl bg-indigo-500 items-center rounded-t-xl pt-0 p-2">
              <Medal medalType="gold" />
              <div className="flex flex-col items-center w-full h-full pb-32 gap-y-32 justify-end">
                <p className="text-white font-bold text-5xl">1</p>
                <div className="flex flex-col sm:flex-row sm:gap-y-4 gap-x-4">
                  {podium.firstPlace.length > 0 && podium.firstPlace.filter((place) => place.image).length > 0 ? (
                    <Slider teams={podium.firstPlace} />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white border-indigo-600 font-bold border-2 flex items-center justify-center">
                      <User size={28} className="text-indigo-500" />
                    </div>
                  )}
                  <p className="flex justify-center items-center h-16 w-16 rounded-full bg-white border-indigo-600 font-bold border-2 text-indigo-500">
                    {`${podium.firstPlace.length > 0 ? podium.firstPlace[0].roundPoints : 0} RP`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex z-10 flex-col h-full text-center justify-end gap-y-5">
            <h2 className="text-2xl">
              {podium.thirdPlace && podium.thirdPlace.map((team) => (
                <span key={team._id}>
                  {team.name}
                  <br />
                </span>
              ))}
            </h2>
            <div className="flex flex-col gap-y-5 justify-start h-[30vh] drop-shadow-2xl bg-indigo-500 items-center rounded-t-xl pt-0 p-2">
              <Medal medalType="bronze" />
              <div className="flex flex-col w-full h-full items-center pb-10 gap-y-10 justify-end">
                <p className="text-white font-bold text-5xl">3</p>
                <div className="flex flex-col sm:flex-row sm:gap-y-4 gap-x-4">
                  {podium.thirdPlace.length > 0 && podium.thirdPlace.filter((place) => place.image).length > 0 ? (
                    <Slider teams={podium.thirdPlace} />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white border-indigo-600 font-bold border-2 flex items-center justify-center">
                      <User size={28} className="text-indigo-500" />
                    </div>
                  )}
                  <p className="flex justify-center items-center h-16 w-16 rounded-full bg-white border-indigo-600 font-bold border-2 text-indigo-500">
                    {`${podium.thirdPlace.length > 0 ? podium.thirdPlace[0].roundPoints : 0} RP`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podium;
