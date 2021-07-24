import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideosByChannel } from '../../redux/actions/videos.action'
import { getChannelDetails } from '../../redux/actions/channel.action'

import Video from '../../components/video/Video'
import './_channelScrenn.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import numeral from 'numeral'

const ChannelScreen = () => {
  const { channelId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideosByChannel(channelId))
    dispatch(getChannelDetails(channelId))
  }, [dispatch, channelId])

  const { videos, loading } = useSelector((state) => state.channelVideos)
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  )
  return (
    <>
      <div className="px-5 py-2 my-2  d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <img
            src={snippet?.thumbnails?.default?.url}
            alt="avatar"
            width="80px"
            height="80px"
            className="me-3 rounded-circle"
          />
          <div className="d-flex flex-column">
            <span>{snippet?.title}</span>
            <span>
              {' '}
              {numeral(statistics?.subscriberCount).format('0.a')} Subscribers
            </span>
          </div>
        </div>
        <button>
          Subscribe
          {/* {subscriptionStatus ? 'Subscribed' : 'Subscribe'} */}
        </button>
      </div>

      <Container>
        <Row className="mt-2">
          {!loading
            ? videos.map((video) => (
                <Col md={4} lg={3} key={video.id}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map((_, i) => (
                <Col md={4} lg={3} key={i}>
                  <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  )
}

export default ChannelScreen
