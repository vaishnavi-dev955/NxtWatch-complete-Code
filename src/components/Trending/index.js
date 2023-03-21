import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiOutlineFire} from 'react-icons/hi'
import Header from '../Header'
import NxtWatchContext from '../../Context/NxtWatchContext'
import AllOptions from '../AllOptions'
import './index.css'

class Trending extends Component {
  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          const overflowContainer = isDarkBtnTheme
            ? 'Dark-overflow-container1'
            : 'light-overflow-container1'
          const TrendingHeader = isDarkBtnTheme
            ? 'Dark-Trending-Header1'
            : 'light-Trending-Header1'
          const logoStylebackground = isDarkBtnTheme
            ? 'dark-logo-background'
            : 'light-logo-background'
          const trendingHeading = isDarkBtnTheme
            ? 'dark-Trending-heading'
            : 'light-Trending-heading'
          return (
            <>
              <Header />
              <div className="container1">
                <AllOptions />
                <div className={overflowContainer}>
                  <div className={TrendingHeader}>
                    <div className={logoStylebackground}>
                      <HiOutlineFire className="logo-style1" />
                    </div>
                    <h1 className={trendingHeading}>Trending</h1>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending
