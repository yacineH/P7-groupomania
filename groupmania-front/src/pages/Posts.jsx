import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CardPost from '../components/CardPost'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { findPosts } from '../services/postAPI'
import { BsFillFilePostFill } from 'react-icons/bs'
import styled from 'styled-components'
import PaginComp from '../components/PaginComp'

const DivNewPost = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`
const DivLink = styled.div`
  margin: 15px;
  color: #4e5166;
`
const StyledLink = styled(Link)`
  color: #4e5166;
  font-size: 18px;
  text-decoration: none;
`
const DivContent = styled.div`
  margin-bottom: 100px;
`
const DivPost = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  useEffect(() => {
    const fetchAllPosts = async () => {
      const data = await findPosts(pageNumber)

      setPosts(data.posts)
      setTotalPages(data.totalPage)
      setIsLoading(false)
    }
    fetchAllPosts()
  }, [pageNumber])

  return (
    <div>
      <Header />
      <DivNewPost>
        <DivLink>
          <StyledLink to="/newPost">
            New Post <BsFillFilePostFill />
          </StyledLink>
        </DivLink>
      </DivNewPost>
      <DivContent>
        <DivPost>
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            posts &&
            posts.map(
              (post) => (
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  to={`/post/${post._id}`}
                  key={post._id}
                >
                  <CardPost post={post} />
                </Link>
              ),
              0
            )
          )}
        </DivPost>

        <PaginComp
          setPage={setPageNumber}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      </DivContent>
      <Footer />
    </div>
  )
}
