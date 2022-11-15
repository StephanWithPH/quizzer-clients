import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle } from 'react-feather';
import Header from '../components/Header';
import { getTeamActionAsync } from '../actions/teamActionCreator';

function Lobby() {
  const serverURL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getTeamActionAsync());
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col gap-y-5 items-center justify-center h-full">
        {
          team.image ? (
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <img src={serverURL + team.image} className="object-cover w-full h-full object-center" alt="Afbeelding van team" />
            </div>
          )
            : (
              <CheckCircle size={92} className="text-green-500" />
            )
        }
        <p className="font-bold text-xl">Je zit in de lobby</p>
        <div className="flex w-1/2 justify-between items-center">
          <p>Ronde Punten:</p>
          <span
            className="rounded-full bg-indigo-500 text-white text-xl w-10 h-10 font-bold flex justify-center items-center p-2"
          >
            {team.roundPoints}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
