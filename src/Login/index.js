import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
    apiStatus: false,
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    console.log('form triggered')
    const {usernameInput, passwordInput} = this.state

    const userData = {
      user_id: usernameInput,
      pin: passwordInput,
    }

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      this.setState({apiStatus: true})
    } else {
      const errorMsg = fetchedData.error_msg
      this.setState({errorMsg, apiStatus: false.failure})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
    const {usernameInput, passwordInput, apiStatus, errorMsg} = this.state
    console.log(errorMsg)
    return (
      <div className="login-main-container">
        <div className="content-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <form className="form-container" onSubmit={this.onSubmitLoginForm}>
            <h1>Welcome Back!</h1>
            <label htmlFor="userIdInput" className="label">
              User ID
            </label>
            <input
              type="text"
              className="input"
              id="userIdInput"
              placeholder="Enter User ID"
              onChange={this.onChangeUsernameInput}
              value={usernameInput}
            />

            <label htmlFor="passwordInput" className="label">
              PIN
            </label>
            <input
              type="password"
              className="input"
              id="passwordInput"
              placeholder="Enter PIN"
              onChange={this.onChangePasswordInput}
              value={passwordInput}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            <p className="error-msg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
