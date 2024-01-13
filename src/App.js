import { BrowserRouter, Routes } from "react-router-dom";
import { RouterComponent } from "./routes/RouterComponent";

import { routerSchema } from "./routes/routerSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Config } from "config";
import { AccountActionCreator } from "store/reducers/accountReducer/action-creator";

export default () => {

  const { walletAddress } = useSelector(state => state.accountReducer)

  const [seconds, setSeconds] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    let interval
    interval = setInterval(() => {
      if (!seconds) {

        if (walletAddress) {
          dispatch(AccountActionCreator.getUserInfo())
        }
        setSeconds(1);
      } else if (seconds >= Config().HEARTBEAT_RATE) {
        setSeconds(0)
      } else setSeconds(seconds + 1)
    }, 1000)

    return () => clearInterval(interval);
  }, [seconds])


  return (
    <BrowserRouter>
      <Routes>{routerSchema.map(RouterComponent)}</Routes>
    </BrowserRouter>
  )
}
