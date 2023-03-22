import {Link} from 'react-router-dom'

import './index.css'

import {HiFire, HiOutlineFire} from 'react-icons/hi'

import {SiYoutubegaming} from 'react-icons/si'
import {
  AiFillSave,
  AiOutlineSave,
  AiFillHome,
  AiOutlineHome,
} from 'react-icons/ai'

import NxtWatchContext from '../../Context/NxtWatchContext'
import {LeftContainer, ListContainer1, Listitem} from './styledComponents'

const AllOptions = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {
        isDarkBtnTheme,
        isHomeBtnClick,
        isTrendingClick,
        isGamingClick,
        isSavedVideosClick,
        onHomeBtn,
        onTrendingBtn,
        onGamingBtn,
        onSavedBtn,
      } = value
      const logoStyle = isDarkBtnTheme ? 'Dark-logo-style' : 'light-logo-style'
      const Contactpara = isDarkBtnTheme ? 'Dark-para1' : 'light-para1'
      const onClickHomeButton = () => {
        onHomeBtn()
      }
      const onClickTrendingButton = () => {
        onTrendingBtn()
      }
      const onClickGamingButton = () => {
        onGamingBtn()
      }
      const onClickSavedButton = () => {
        onSavedBtn()
      }

      const HomeButton = isHomeBtnClick
        ? 'click-list-button'
        : 'Not-click-list-button'
      const TrendingButton = isTrendingClick
        ? 'click-list-button'
        : 'Not-click-list-button'
      const GamingButton = isGamingClick
        ? 'click-list-button'
        : 'Not-click-list-button'
      const savedVidoesBtn = isSavedVideosClick
        ? 'click-list-button'
        : 'Not-click-list-button'
      const darkThemeHomePara = isHomeBtnClick
        ? 'click-dark-theme-para'
        : 'No-click-dark-theme-para'
      const lightThemeHomePara = isHomeBtnClick
        ? 'click-light-theme-para'
        : 'No-click-light-theme-para'
      const darkThemeTrendingPara = isTrendingClick
        ? 'click-dark-theme-para'
        : 'No-click-dark-theme-para'
      const lightThemeTrendingPara = isTrendingClick
        ? 'click-light-theme-para'
        : 'No-click-light-theme-para'
      const darkThemeGamingPara = isGamingClick
        ? 'click-dark-theme-para'
        : 'No-click-dark-theme-para'
      const lightThemeGamingPara = isGamingClick
        ? 'click-light-theme-para'
        : 'No-click-light-theme-para'
      const darkThemeSavedPara = isSavedVideosClick
        ? 'click-dark-theme-para'
        : 'No-click-dark-theme-para'
      const lightThemeSavedPara = isSavedVideosClick
        ? 'click-light-theme-para'
        : 'No-click-light-theme-para'
      return (
        <LeftContainer isDarkBtnTheme={isDarkBtnTheme}>
          <ListContainer1>
            <Link to="/">
              <Listitem>
                <button
                  type="button"
                  onClick={onClickHomeButton}
                  className={HomeButton}
                >
                  {isDarkBtnTheme ? (
                    <AiFillHome className={logoStyle} />
                  ) : (
                    <AiOutlineHome className={logoStyle} />
                  )}
                  {isDarkBtnTheme ? (
                    <p className={darkThemeHomePara}>Home</p>
                  ) : (
                    <p className={lightThemeHomePara}>Home</p>
                  )}
                </button>
              </Listitem>
            </Link>
            <Link to="/trending">
              <Listitem>
                <button
                  type="button"
                  onClick={onClickTrendingButton}
                  className={TrendingButton}
                >
                  {isDarkBtnTheme ? (
                    <HiOutlineFire className={logoStyle} />
                  ) : (
                    <HiFire className={logoStyle} />
                  )}
                  {isDarkBtnTheme ? (
                    <p className={darkThemeTrendingPara}>Trending</p>
                  ) : (
                    <p className={lightThemeTrendingPara}>Trending</p>
                  )}
                </button>
              </Listitem>
            </Link>
            <Link to="/gaming">
              <Listitem>
                <button
                  type="button"
                  onClick={onClickGamingButton}
                  className={GamingButton}
                >
                  <SiYoutubegaming className={logoStyle} />
                  {isDarkBtnTheme ? (
                    <p className={darkThemeGamingPara}>Gaming</p>
                  ) : (
                    <p className={lightThemeGamingPara}>Gaming</p>
                  )}
                </button>
              </Listitem>
            </Link>
            <Listitem>
              <button
                type="button"
                onClick={onClickSavedButton}
                className={savedVidoesBtn}
              >
                {isDarkBtnTheme ? (
                  <AiOutlineSave className={logoStyle} />
                ) : (
                  <AiFillSave className={logoStyle} />
                )}
                {isDarkBtnTheme ? (
                  <p className={darkThemeSavedPara}>Saved Videos</p>
                ) : (
                  <p className={lightThemeSavedPara}>Saved Videos</p>
                )}
              </button>
            </Listitem>
          </ListContainer1>
          <div>
            <p className={Contactpara}>CONTACT US</p>
            <ul className="list-container2">
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="social-logo"
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="social-logo"
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="social-logo"
                />
              </li>
            </ul>
            <p className={Contactpara}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </LeftContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default AllOptions
