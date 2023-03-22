import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import {FullContainer, BannerElement} from './styledComponents'

import Header from '../Header'
import NxtWatchContext from '../../Context/NxtWatchContext'
import AllOptions from '../AllOptions'
import HomeListItem from '../HomeLIstItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    VideosData: [],
    apiStatus: apiConstants.initial,
    onClickCloseBtn: false,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    console.log(response)

    const UpdatingChannelData = Item => {
      const updatedChannel = {
        name: Item.name,
        profileImageUrl: Item.profile_image_url,
      }
      return updatedChannel
    }
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.videos.map(eachItem => ({
        channel: UpdatingChannelData(eachItem.channel),
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({VideosData: UpdatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => this.getHomeVideos()

  onSuccessView = () => {
    const {VideosData} = this.state
    const EmptyVideoView = VideosData.length === 0
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          return (
            <>
              {EmptyVideoView ? (
                <div className="Empty-view-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                    className="No-Videos-logo"
                  />
                  <h1
                    className={
                      isDarkBtnTheme
                        ? 'Dark-no-videos-heading'
                        : 'light-no-videos-heading'
                    }
                  >
                    No Search results found
                  </h1>
                  <p
                    className={
                      isDarkBtnTheme
                        ? 'Dark-no-videos-para'
                        : 'light-no-videos-para'
                    }
                  >
                    Try different key words or remove search filter
                  </p>
                  <button type="button" className="Retry-button">
                    Retry
                  </button>
                </div>
              ) : (
                <ul className="main-list-container">
                  {VideosData.map(eachItem => (
                    <HomeListItem ListOptionData={eachItem} key={eachItem.id} />
                  ))}
                </ul>
              )}
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  onClickCloseButton = () =>
    this.setState(prevState => ({onClickCloseBtn: !prevState.onClickCloseBtn}))

  onLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickTry = () => {
    this.getHomeVideos()
  }

  onFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkBtnTheme} = value
        return (
          <div className="Failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-logo"
            />
            <h1
              className={
                isDarkBtnTheme
                  ? 'Dark-failure-heading'
                  : 'light-failure-heading'
              }
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={
                isDarkBtnTheme ? 'Dark-failure-para' : 'light-failure-para'
              }
            >
              We are having some trouble to complete your request Please try
              again
            </p>
            <button
              type="button"
              className="Retry-button"
              onClick={this.onClickTry}
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
    const {searchInput, VideosData, onClickCloseBtn} = this.state
    console.log(VideosData)
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          const overflowContainer = isDarkBtnTheme
            ? 'Dark-overflow-container'
            : 'light-overflow-container'
          return (
            <FullContainer isDarkBtnTheme={isDarkBtnTheme}>
              <Header className="Header-class" />
              <div className="container">
                <AllOptions className="options-class" />
                <div className={overflowContainer}>
                  <div>
                    {onClickCloseBtn ? null : (
                      <BannerElement data-testid="banner">
                        <div>
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="nxt watch logo"
                            className="nxt-watch-logo"
                          />
                          <p className="Buy-it-para">
                            Buy Nxt Watch Premium prepaid plans with UPI
                          </p>
                          <button type="button" className="Get-button">
                            GET IT NOW
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            data-testid="close"
                            onClick={this.onClickCloseButton}
                            className="close-button"
                          >
                            <IoMdClose className="close-icon" />
                          </button>
                        </div>
                      </BannerElement>
                    )}
                    <div className="search-container">
                      <input
                        type="search"
                        className="searchStyle"
                        placeholder="Search"
                        onChange={this.onChangeSearchInput}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        onClick={this.onClickSearch}
                        data-testid="searchButton"
                        className="search-button"
                      >
                        <img
                          src="http://www.clker.com/cliparts/g/Y/P/o/h/U/search-logo-md.png"
                          alt="search"
                          className="search-logo"
                        />
                      </button>
                    </div>
                    <div>{this.renderingTheViews()}</div>
                  </div>
                </div>
              </div>
            </FullContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
