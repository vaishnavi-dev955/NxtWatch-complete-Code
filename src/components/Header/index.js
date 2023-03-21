import {withRouter} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import 'reactjs-popup/dist/index.css'

import NxtWatchContext from '../../Context/NxtWatchContext'

import './index.css'

const Header = props => {
  const onClickConfirm = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkBtnTheme, onToggleTheme} = value
        const onClickToggleTheme = () => {
          onToggleTheme()
        }
        const background = isDarkBtnTheme
          ? 'Dark-background'
          : 'Light-background'
        const ImageUrl = isDarkBtnTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const ButtonImageUrl = isDarkBtnTheme
          ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'
        const LogoutButtonClass = isDarkBtnTheme
          ? 'Dark-logout'
          : 'light-logout'
        const popUpContent = isDarkBtnTheme
          ? 'Dark-popup-content'
          : 'light-popup-content'
        const popUpPara = isDarkBtnTheme
          ? 'light-popup-para'
          : 'Dark-popup-para'
        const cancelButton = isDarkBtnTheme
          ? 'Dark-cancelButton'
          : 'light-cancelButton'

        return (
          <div className={background}>
            <img src={ImageUrl} alt="website logo" className="image-style" />
            <div className="sub-container1">
              <button
                type="button"
                className="custom-button"
                onClick={onClickToggleTheme}
                data-testid="theme"
              >
                <img
                  src={ButtonImageUrl}
                  className="image-style2"
                  alt="theme2"
                />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="image-style2"
              />
              <div>
                <Popup
                  modal
                  trigger={
                    <button type="button" className={LogoutButtonClass}>
                      LogOut
                    </button>
                  }
                  className={popUpContent}
                >
                  {close => (
                    <>
                      <div>
                        <p className={popUpPara}>
                          Are you sure, you want to logout
                        </p>
                      </div>
                      <div className="buttons-container1">
                        <button
                          type="button"
                          className={cancelButton}
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={onClickConfirm}
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
