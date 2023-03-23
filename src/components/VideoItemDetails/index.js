import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AllOptions from '../AllOptions'
import NxtWatchContext from '../../Context/NxtWatchContext'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class videoItemDetails extends Component {
  state = {
    videItemDetailsData: {},
    apiStatus: apiConstants.initial,
    likeBtnClick: false,
    disLikeBtnClick: false,
    saveBtnClick: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    console.log('get Called')

    if (response.ok === true) {
      const data = await response.json()

      const UpdatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        id: data.video_details.id,
        description: data.video_details.description,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
        publishedAt: data.video_details.published_at,
      }
      this.setState({
        videItemDetailsData: UpdatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSuccessView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkBtnTheme, onAddVideo} = value
        const {
          videItemDetailsData,
          likeBtnClick,
          disLikeBtnClick,
          saveBtnClick,
        } = this.state
        const {
          description,
          title,
          viewCount,
          videoUrl,
          channel,
          publishedAt,
        } = videItemDetailsData
        const {profileImageUrl, name, subscriberCount} = channel
        console.log(name, profileImageUrl)
        const newdate = new Date(publishedAt)
        const date = formatDistanceToNow(new Date(newdate))
        const onClickLikeButton = () => {
          this.setState({likeBtnClick: true, disLikeBtnClick: false})
        }
        const onClickdisLikeButton = () => {
          this.setState({
            disLikeBtnClick: true,
            likeBtnClick: false,
          })
        }
        const onClickSaveButton = () => {
          this.setState(prevState => ({saveBtnClick: !prevState.saveBtnClick}))
          onAddVideo({...videItemDetailsData})
        }

        return (
          <div className="videoid-responsive-container">
            <div className="react-player-style">
              <ReactPlayer url={videoUrl} width="80vw" height="50vh" />
            </div>
            <p
              className={
                isDarkBtnTheme
                  ? 'dark-Nxtwatch-videoid-heading'
                  : 'light-Nxtwatch-videoid-heading'
              }
            >
              {title}
            </p>
            <div className="paragraph-container">
              <p
                className={
                  isDarkBtnTheme
                    ? 'dark-Nxtwatch-videoid-paragraph'
                    : 'light-Nxtwatch-videoid-paragraph'
                }
              >
                {viewCount} views
              </p>
              <p
                className={
                  isDarkBtnTheme
                    ? 'dark-Nxtwatch-videoid-paragraph'
                    : 'light-Nxtwatch-videoid-paragraph'
                }
              >
                {date}
              </p>
              <ul className="inner-container">
                <li>
                  <button
                    type="button"
                    className="icons-button"
                    onClick={onClickLikeButton}
                  >
                    <AiFillLike
                      className={
                        likeBtnClick
                          ? 'active-icons-style'
                          : 'Non-active-icons-style'
                      }
                    />
                    <p
                      className={
                        likeBtnClick
                          ? 'active-icons-para'
                          : 'Non-active-icons-para'
                      }
                    >
                      Like
                    </p>
                  </button>
                </li>
                <button
                  type="button"
                  className="icons-button"
                  onClick={onClickdisLikeButton}
                >
                  <AiFillDislike
                    className={
                      disLikeBtnClick
                        ? 'active-icons-style'
                        : 'Non-active-icons-style'
                    }
                  />
                  <p
                    className={
                      disLikeBtnClick
                        ? 'active-icons-para'
                        : 'Non-active-icons-para'
                    }
                  >
                    Dislike
                  </p>
                </button>
                <li>
                  <button
                    type="button"
                    className="icons-button"
                    onClick={onClickSaveButton}
                  >
                    <BiListPlus
                      className={
                        saveBtnClick
                          ? 'active-icons-style'
                          : 'Non-active-icons-style'
                      }
                    />
                    <p
                      className={
                        saveBtnClick
                          ? 'active-icons-para'
                          : 'Non-active-icons-para'
                      }
                    >
                      Save
                    </p>
                  </button>
                </li>
              </ul>
            </div>
            <hr />
            <div className="inner-container2">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="video-id-logo"
              />
              <div>
                <p
                  className={
                    isDarkBtnTheme ? 'dark-icons-para' : 'light-icons-para'
                  }
                >
                  {name}
                </p>
                <p
                  className={
                    isDarkBtnTheme ? 'dark-icons-para' : 'light-icons-para'
                  }
                >
                  {subscriberCount} subscribers
                </p>
                <p
                  className={
                    isDarkBtnTheme
                      ? 'dark-Nxtwatch-videoid-paragraph'
                      : 'light-Nxtwatch-videoid-paragraph'
                  }
                >
                  {description}
                </p>
              </div>
            </div>
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

  onClickRetryButton = () => this.getVideoItemDetails()

  onFailureView = () => (
    <div className="Failure-Video-id-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-videoId-logo"
      />
      <h1 className="videoId-failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-videoId-para">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        className="Retry-videoId-failure-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
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
    const {videItemDetailsData} = this.state
    console.log(videItemDetailsData)
    console.log('render Called')
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          const overflowContainer = isDarkBtnTheme
            ? 'Dark-uday-container3'
            : 'light-overflow-container3'

          return (
            <>
              <Header />
              <div className="container3">
                <AllOptions />
                <div className={overflowContainer}>
                  {this.renderingTheViews()}
                </div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default videoItemDetails
