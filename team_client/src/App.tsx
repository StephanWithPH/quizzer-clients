import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Home from './views/Home';
import Waiting from './views/Waiting';
import Rejected from './views/Rejected';
import Lobby from './views/Lobby';
import Question from './views/Question';
import DarkMode from './components/DarkMode';
import { useAppSelector } from './hooks/redux.ts';
import { Routes } from './enums/routes.ts';

toastr.options = {
    progressBar: true,
    newestOnTop: true,
    preventDuplicates: true,
    positionClass: 'toast-top-right',
    hideMethod: 'slideUp',
    closeMethod: 'slideUp'
};

function renderRoute(route: Routes | undefined) {
    switch (route) {
        case Routes.LOGIN:
            return <Home />;
        case Routes.LOBBY:
            return <Lobby />;
        case Routes.WAITING:
            return <Waiting />;
        case Routes.REJECTED:
            return <Rejected />;
        case Routes.QUESTION:
            return <Question />;
        default:
            return <Home />;
    }
}

function App() {
    const routeState = useAppSelector((state) => state.router);
    return (
        <div className="relative bg-gray-100 dark:bg-neutral-800 dark:text-white h-screen">
            <DarkMode />
            {renderRoute(routeState?.currentRoute)}
        </div>
    );
}

export default App;
