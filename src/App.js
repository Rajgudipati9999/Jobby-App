import {Component} from 'react'
import { BrowserRouter,Switch,Route} from "react-router-dom"
import Home from './components/Home'
import Jobs from './components/Jobs'
import Login from './components/Login'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'
import './App.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/jobs' component={Jobs}/>
          <Route exact path='/jobs/:id' component={JobItemDetails} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App
