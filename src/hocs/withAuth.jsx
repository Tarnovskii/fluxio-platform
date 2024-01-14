import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {routerBook} from "../routes/routerBook";

import {Navigate} from 'react-router-dom'

export const withAuth = Component => {
  return props => {
      const { walletAddress } = useSelector(state => state.accountReducer)
      const {pathname} = useLocation();

      if (!walletAddress && pathname !== routerBook.main) return <Navigate to={routerBook.main}/>

      return <Component {...props} />
  }
}