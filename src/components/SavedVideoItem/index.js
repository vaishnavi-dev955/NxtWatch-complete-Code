import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const SavedVideoItem = props => {
  const {SavedVideoItemData} = props
  const {
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
    title,
    id,
  } = SavedVideoItemData
  const {name, profileImageUrl} = channel
  const newdate = new Date(publishedAt)
  const date = formatDistanceToNow(new Date(newdate))
  return (
    <Link to={`/videos/${id}`} className="nav-link5">
      <li className="new-saved-list-item1">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-saved-style"
        />
        <div className="sub-saved-list1">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="channel-saved-logo"
          />
          <div>
            <p className="list-saved-heading">{title}</p>
            <p>{name}</p>
            <div className="sub-saved-list2">
              <p className="list-saved-description">{viewCount} Views</p>
              <p className="list-saved-description">{date}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideoItem
