import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import AllOptions from '../AllOptions'
import NxtWatchContext from '../../Context/NxtWatchContext'

class videoItemDetails extends Component {
  state = {videItemDetailsData: {}}

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
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
    console.log(response)
    const UpdatingChannelData = Item => {
      const updatedChannel = {
        name: Item.name,
        profileImageUrl: Item.profile_image_url,
        subscriberCount: Item.subscriber_count,
      }
      return updatedChannel
    }
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = {
        channel: UpdatingChannelData(data.video_details.channel),
        id: data.video_details.id,
        description: data.video_details.description,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
        publishedAt: data.video_details.published_at,
      }
      this.setState({videItemDetailsData: UpdatedData})
    }
  }

  render() {
    const {videItemDetailsData} = this.state
    console.log(videItemDetailsData)
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkBtnTheme} = value
          const subVideoItemContainer = isDarkBtnTheme
            ? 'Dark-subVideoItemContainer'
            : 'light-subVideoItemContainer'
          return (
            <div className="main-videoItem-Container">
              <Header />
              <div className="videoItem-container">
                <AllOptions />
                <div className={subVideoItemContainer}>
                  <p>This is for rendering Views</p>
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default videoItemDetails
