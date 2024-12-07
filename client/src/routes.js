import { useRoutes } from 'react-router-dom';
import configData from './config';
import Home from './components/home';
import ViewData from './components/viewData';
import DataInitialize from './components/dataInitialize';


export default function Routes() {
    return useRoutes([{
        path: configData.HOME_URL,
        element: <Home />
    },{
        path: configData.VIEW_URL,
        element: <ViewData />
    },{
        path: configData.INITIALIZE_URL,
        element: <DataInitialize />
    }
])
}
