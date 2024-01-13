import { Navigate } from 'react-router-dom';
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import {LandingPage} from "../pages/LandingPage/LandingPage";
import {DashboardPage} from "../pages/DashboardPage/DashboardPage";

export const routerSchema = [{
  path: `/`,
  exact: true,
  title: 'Main',
  element: <MainLayout />,
  children: [{
    path: 'dashboard',
    element: <DashboardPage/>,
    exact: true
  },{
    index: true,
    element: <LandingPage />,
  }]
}, {
  path: `/*`,
  element: <Navigate to={`/`} />
}];
