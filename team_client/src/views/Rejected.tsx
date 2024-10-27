import { X } from 'react-feather';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { Routes } from '../enums/routes.ts';

function Rejected() {
    const dispatch = useAppDispatch();
    const { lobbyCode } = useAppSelector((state) => state.global);
    const handleClick = () => {
        window.history.pushState('', '', `/${lobbyCode}`);
        dispatch(setRoute(Routes.LOGIN));
    };

    return (
        <div className="h-screen flex flex-col gap-y-10 items-center justify-center">
            <X size={92} strokeWidth={3} className="text-6xl text-red-500" />
            <p className="font-bold text-xl">Geweigerd</p>
            <Button styles="w-1/2" onClick={handleClick} name="Terug" />
        </div>
    );
}

export default Rejected;
