// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import BarGraph from '../VaccinationCoverage'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

class CowinDashboard extends Component {
  state = {
    lastDays: [],
    vaccinationAge: [],
    vaccinationGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCowidData()
  }

  renderLoader = () => (
    <div className="card" data-testid="loader">
      <Loader type="ThreeDots" color="black" height={80} width={80} />
    </div>
  )

  getCowidData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      const {
        last_7_days_vaccination: last7Days,
        vaccination_by_age: vaccinationByAge,
        vaccination_by_gender: vaccinationByGender,
      } = data

      this.setState({
        lastDays: last7Days,
        vaccinationAge: vaccinationByAge,
        vaccinationGender: vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGraphs = () => {
    const {vaccinationAge, lastDays, vaccinationGender} = this.state
    return (
      <>
        <BarGraph name={lastDays} />
        <VaccinationByGender name={vaccinationGender} />
        <VaccinationByAge name={vaccinationAge} />
      </>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGraphs()

      case apiStatusConstants.failure:
        return this.renderFailure()

      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="card-container">
        <div className="nav-card">
          <img
            className="nav-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p className="nav-head">Co-win</p>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {this.renderSwitch()}
      </div>
    )
  }
}

export default CowinDashboard