import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Login from './views/Login';
import QuestionOverview from './views/QuestionOverview';
import Lobby from './views/Lobby';
import NextRound from './views/NextRound';
import SelectQuestion from './views/SelectQuestion';
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
            return <Login />;
        case Routes.LOBBY:
            return <Lobby />;
        case Routes.NEXT_ROUND:
            return <NextRound />;
        case Routes.SELECT_QUESTION:
            return <SelectQuestion />;
        case Routes.QUESTION_OVERVIEW:
            return <QuestionOverview />;
        default:
            return <Login />;
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
