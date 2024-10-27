import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useAppSelector } from "./hooks/redux";
import useSound from "use-sound";
import Home from "./views/Home";
import Scoreboard from "./views/Scoreboard";
import Podium from "./views/Podium";
import scoreboardSound from "./assets/lobbySound.mp3";
import podiumSound from "./assets/podiumSound.mp3";
import fireworks from "./assets/fireworks.mp3";
import DarkMode from "./components/DarkMode";
import { Routes } from "./enums/routes";

toastr.options = {
  progressBar: true,
  newestOnTop: true,
  preventDuplicates: true,
  positionClass: "toast-top-right",
  hideMethod: "slideUp",
  closeMethod: "slideUp",
};

function renderRoute(route: Routes) {
  switch (route) {
    case Routes.LOGIN:
      return <Home />;
    case Routes.SCOREBOARD:
      return <Scoreboard />;
    case Routes.PODIUM:
      return <Podium />;
    default:
      return <Home />;
  }
}

function App() {
  const routeState = useAppSelector((state) => state.router);

  const [playScoreboardSound, scoreboardSoundOptions] = useSound(
    scoreboardSound,
    { volume: 0.5, loop: true },
  );

  const [playPodiumSound, podiumSoundOptions] = useSound(podiumSound, {
    volume: 0.5,
    loop: true,
  });

  const [playFireworksSound, fireworksSoundOptions] = useSound(fireworks, {
    volume: 0.5,
    loop: true,
  });

  if (routeState.currentRoute === "scoreboard") {
    podiumSoundOptions.stop();
    fireworksSoundOptions.stop();
    scoreboardSoundOptions.stop();
    playScoreboardSound();
  } else if (routeState.currentRoute === "podium") {
    scoreboardSoundOptions.stop();
    podiumSoundOptions.stop();
    fireworksSoundOptions.stop();
    playPodiumSound();
    playFireworksSound();
  } else {
    scoreboardSoundOptions.stop();
    podiumSoundOptions.stop();
    fireworksSoundOptions.stop();
  }

  return (
    <div className="bg-gray-100 dark:bg-neutral-800 dark:text-white transition-all min-h-screen">
      <DarkMode />
      {renderRoute(routeState.currentRoute)}
    </div>
  );
}

export default App;
