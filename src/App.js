import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import './assets/icon/iconfont.css'

import Login from './views/login/Login.jsx';
import NotFound from './views/notFound/NotFound'
import Register from './views/register/Register'
import RegisterInfor from './views/registerInfor/RegisterInfor'
import Agreements from './views/agreement/Agreement'
import Container from './views/container/Container'
import Search from './views/search/Search'
import Unrealized from './views/unrealized/Unrealizend'

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Redirect path="*" to="/agreement"></Redirect> */}
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/registerInfor" component={RegisterInfor}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/container" component={Container}></Route>
        <Route path="/agreement/:id" component={Agreements}></Route>
        <Route path="/unrealized" component={Unrealized}></Route>
        <Route path="/notFound" component={NotFound}></Route>
        <Redirect path="*" to="/container"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
