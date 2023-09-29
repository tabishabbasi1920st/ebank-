import {Switch, Route} from 'react-router-dom'
import './App.css'
import Home from './Home'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import NotFound from './NotFound'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
