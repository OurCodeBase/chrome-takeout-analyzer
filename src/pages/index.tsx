import { lazy, LocationProvider, Route, Router } from 'preact-iso'

const Home = lazy(() => import('./home'))
const Dashboard = lazy(() => import('./dashboard'))

export default function() {
  return <LocationProvider>
    <Router>
      <Route path="/" component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Router>
  </LocationProvider>
}
