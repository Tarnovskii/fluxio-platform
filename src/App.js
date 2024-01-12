import { BrowserRouter, Routes } from "react-router-dom";
import {RouterComponent} from "./routes/RouterComponent";

import {routerSchema} from "./routes/routerSchema";

export default () => {
  return (
      <BrowserRouter>
          <Routes>{routerSchema.map(RouterComponent)}</Routes>
      </BrowserRouter>
  )
}