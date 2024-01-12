import { Navigate } from 'react-router-dom';
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import {LandingPage} from "../pages/LandingPage/LandingPage";

export const routerSchema = [{
  path: `/`,
  exact: true,
  title: 'Main',
  element: <MainLayout />,
  children: [{
    index: true,
    element: <LandingPage />,
  }]
}, {
  path: `/*`,
  element: <Navigate to={`/`} />
}];
