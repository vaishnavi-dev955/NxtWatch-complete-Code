import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import NxtWatchContext from '../../Context/NxtWatchContext'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    isCheckboxChecked: false,
  }

  onGiveUsername = event => {
    this.setState({username: event.target.value})
  }

  onGivePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showErrorMsg: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const Url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(Url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  onCheckboxChecked = () =>
    this.setState(prevState => ({
      isCheckboxChecked: !prevState.isCheckboxChecked,
    }))

  render() {
    const {
      username,
      showErrorMsg,
      errorMsg,
      isCheckboxChecked,
      password,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          const backgroundClass = isDarkBtnTheme
            ? 'Dark-main-container'
            : 'light-main-container'
          const formBackground = isDarkBtnTheme
            ? 'Dark-Form-container'
            : 'Light-Form-container'
          const LoginContainer = isDarkBtnTheme
            ? 'Dark-login-container'
            : 'light-login-container'
          const webisteImageurl = isDarkBtnTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          const labelStyle = isDarkBtnTheme
            ? 'Dark-label-style'
            : 'light-label-style'
          const InputStyle = isDarkBtnTheme
            ? 'Dark-input-style'
            : 'light-input-style'
          const paraclass = isDarkBtnTheme
            ? 'Dark-show-password'
            : 'light-show-password'
          const checkboxContainer = isDarkBtnTheme
            ? 'Dark-check-box-container'
            : 'light-check-box-container'
          const checkboxstyle = isDarkBtnTheme
            ? 'Dark-check-box-style'
            : 'light-check-box-style'
          return (
            <div className={backgroundClass}>
              <form className={formBackground} onSubmit={this.onSubmitForm}>
                <div className={LoginContainer}>
                  <img
                    src={webisteImageurl}
                    alt="website logo"
                    className="Website-Nxtwatch-image"
                  />
                  <label htmlFor="Username" className={labelStyle}>
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="Username"
                    className={InputStyle}
                    placeholder="Username"
                    onChange={this.onGiveUsername}
                    value={username}
                  />
                  <label htmlFor="password" className={labelStyle}>
                    PASSWORD
                  </label>
                  <input
                    type={isCheckboxChecked ? 'text' : 'password'}
                    id="password"
                    className={InputStyle}
                    placeholder="Password"
                    onChange={this.onGivePassword}
                    value={password}
                  />
                  <div className={checkboxContainer}>
                    <input
                      type="checkbox"
                      id="ShowPassword"
                      className={checkboxstyle}
                      onChange={this.onCheckboxChecked}
                      checked={isCheckboxChecked}
                    />
                    <label className={paraclass} htmlFor="ShowPassword">
                      Show Password
                    </label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showErrorMsg && <p className="Error-msg">*{errorMsg}</p>}
                </div>
              </form>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default LoginForm
