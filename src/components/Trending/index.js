import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiOutlineFire} from 'react-icons/hi'
import Header from '../Header'
import NxtWatchContext from '../../Context/NxtWatchContext'
import AllOptions from '../AllOptions'
import TrendingVideoItem from '../TrendingVideoItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {TrendingVideosData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatingChannelData = Item => {
        const updatedChannel = {
          name: Item.name,
          profileImageUrl: Item.profile_image_url,
        }
        return updatedChannel
      }
      const UpdatedData = data.videos.map(eachItem => ({
        channel: UpdatingChannelData(eachItem.channel),
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        TrendingVideosData: UpdatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSuccessView = () => {
    const {TrendingVideosData} = this.state
    return (
      <div>
        <ul>
          {TrendingVideosData.map(eachItem => (
            <TrendingVideoItem
              TrendingVideoItemData={eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryButton = () => this.getTrendingVideos()

  onFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkBtnTheme} = value
        return (
          <div className="Failure-trending-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-trending-logo"
            />
            <h1
              className={
                isDarkBtnTheme
                  ? 'Dark-failure-trending-heading'
                  : 'light-failure-trending-heading'
              }
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={
                isDarkBtnTheme
                  ? 'Dark-failure-trending-para'
                  : 'light-failure-trending-para'
              }
            >
              We are having some trouble to complete your request Please try
              again
            </p>
            <button
              type="button"
              className="Retry-trending-button"
              onClick={this.onClickRetryButton}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  onLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
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

export default Trending
