import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CardPost from '../components/CardPost'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { findPosts } from '../services/postAPI'
import { BsFillFilePostFill } from 'react-icons/bs'
import styled from 'styled-components'

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

  useEffect(() => {
    const fetchAllPosts = async () => {
      const data = await findPosts()
      setPosts(
        data.sort((param1, param2) => {
          return param2.datePost - param1.datePost
        })
      )
      setPosts(data)
      setIsLoading(false)
    }
    fetchAllPosts()
  }, [])

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
        <nav
          style={{
            border: '1px solid red',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ul class="pagination">
            <li class="page-item disabled">
              <a className="page-link" href=".">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a className="page-link" href=".">
                1
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href=".">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href=".">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href=".">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </DivContent>
      <Footer />
    </div>
  )
}
