import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import './index.css'

const HomeListItem = props => {
  const {ListOptionData} = props
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    id,
  } = ListOptionData
  const {name, profileImageUrl} = channel
  const newdate = new Date(publishedAt)
  const date = formatDistanceToNow(new Date(newdate))

  return (
    <Link to={`/videos/${id}`} className="nav-link3">
      <li className="new-list-item1">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-style"
        />
        <div className="sub-list1">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div>
            <p className="list-heading">{title}</p>
            <p>{name}</p>
            <div className="sub-list2">
              <p className="list-description">{viewCount} Views</p>
              <p className="list-description">{date}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeListItem
