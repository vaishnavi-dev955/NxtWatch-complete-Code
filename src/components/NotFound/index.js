import Header from '../Header'
import AllOptions from '../AllOptions'
import NxtWatchContext from '../../Context/NxtWatchContext'

import './index.css'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkBtnTheme} = value
      const overflowNotContainer = isDarkBtnTheme
        ? 'Dark-NotFound-overflow-container1'
        : 'light-NotFound-overflow-container1'
      const NotFoundImageUrl = isDarkBtnTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      const notFoundHeading = isDarkBtnTheme
        ? 'dark-NotFound-heading'
        : 'light-NotFound-heading'
      const notFoundPara = isDarkBtnTheme
        ? 'dark-NotFound-para'
        : 'light-NotFound-para'
      return (
        <>
          <Header />
          <div className="Not-Found-container">
            <AllOptions />
            <div className={overflowNotContainer}>
              <img
                src={NotFoundImageUrl}
                alt="NotFound"
                className="NotFound-Image"
              />
              <h1 className={notFoundHeading}>Page Not Found</h1>
              <p className={notFoundPara}>
                We are sorry, the page you requested could not be found
              </p>
            </div>
          </div>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
