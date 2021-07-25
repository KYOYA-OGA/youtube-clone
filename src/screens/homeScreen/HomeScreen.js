import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'

import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'
import {
  getPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.action'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  )

  const fetchData = () => {
    if (activeCategory === 'All') {
      dispatch(getPopularVideos())
    } else {
      dispatch(getVideosByCategory(activeCategory))
    }
  }
  return (
    <Container>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {!loading
          ? videos.map((video, i) => (
              <Col lg={3} md={4} key={i}>
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map((_, i) => (
              <Col lg={3} md={4} key={i}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  )
}

export default HomeScreen
