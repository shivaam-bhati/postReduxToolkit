import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../features/slices/postsSlice'
import Article from '../components/Article'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, loading, hasErrors } = useSelector((state) => state)

  useEffect(() => {
    dispatch(fetchPosts())
  },[dispatch])

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts</p>

    return posts.map((post) => (<Article key={post.id} post={post} />))
  }

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  )
}

export default Posts