import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  onClickLogOutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-main-container">
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button
            type="button"
            className="logout-btn"
            onClick={this.onClickLogOutButton}
          >
            Logout
          </button>
        </div>
        <div className="home-body-container">
          <h1 className="excellence-heading">
            Your Flexibility, Our Excellence
          </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default Home
