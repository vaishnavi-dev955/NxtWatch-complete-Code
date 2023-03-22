import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import AllOptions from '../AllOptions'
import NxtWatchContext from '../../Context/NxtWatchContext'
import GamingVideoItem from '../GamingVideoItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {GamingVideosData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getGameVideosData()
  }

  getGameVideosData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        GamingVideosData: UpdatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSuccessView = () => {
    const {GamingVideosData} = this.state
    return (
      <ul className="Gaming-list-container">
        {GamingVideosData.map(eachItem => (
          <GamingVideoItem GamingVideoItemData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickRetryGamingButton = () => this.getGameVideosData()

  onFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkBtnTheme} = value
        return (
          <div className="Failure-Gaming-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-Gaming-logo"
            />
            <h1
              className={
                isDarkBtnTheme
                  ? 'Dark-failure-Gaming-heading'
                  : 'light-failure-Gaming-heading'
              }
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={
                isDarkBtnTheme
                  ? 'Dark-failure-Gaming-para'
                  : 'light-failure-Gaming-para'
              }
            >
              We are having some trouble to complete your request Please try
              again
            </p>
            <button
              type="button"
              className="Gaming-Retry-button"
              onClick={this.onClickRetryGamingButton}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderingTheViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.onSuccessView()
      case apiConstants.failure:
        return this.onFailureView()
      case apiConstants.inProgress:
        return this.onLoadingView()
      default:
        return null
    }
  }

  render() {
    const {GamingVideosData} = this.state
    console.log(GamingVideosData)
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          const gameOverflowContainer = isDarkBtnTheme
            ? 'Dark-Game-overflow-container'
            : 'light-Game-overflow-container'
          const GamingHeader = isDarkBtnTheme
            ? 'Dark-Gaming-Header1'
            : 'light-Gaming-Header1'
          const gamingLogoStyleBackground = isDarkBtnTheme
            ? 'dark-logo-Gaming-background'
            : 'light-logo-Gaming-background'
          const gamingHeading = isDarkBtnTheme
            ? 'dark-Gaming-heading'
            : 'light-Gaming-heading'
          return (
            <>
              <Header />
              <div className="Gaming-container1">
                <AllOptions />
                <div className={gameOverflowContainer}>
                  <div className={GamingHeader}>
                    <div className={gamingLogoStyleBackground}>
                      <SiYoutubegaming className="Gaming-logo-style" />
                    </div>
                    <h1 className={gamingHeading}>Gaming</h1>
                  </div>
                  <div>{this.renderingTheViews()}</div>
                </div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
