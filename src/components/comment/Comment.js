import moment from 'moment'
import React from 'react'

import './_comment.scss'

const Comment = ({ comment }) => {
  const { textDisplay, authorProfileImageUrl, authorDisplayName, publishedAt } =
    comment
  return (
    <div className="comment p-2 d-flex">
      <img
        src={authorProfileImageUrl}
        alt={authorDisplayName}
        className="rounded-circle me-3"
        width="50px"
        height="50px"
      />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {authorDisplayName}・{moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  )
}

export default Comment
