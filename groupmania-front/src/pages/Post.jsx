import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { findPost, deletePost, updatePost } from '../services/postAPI'
import AdminContext from '../contexts/adminContext'
import EmployeeContext from '../contexts/employeeContext'
import Like from '../components/Like'
import NoImage from '../assets/no-image.jpg'
import { fetchLike } from '../services/postAPI'

export default function Post() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const { isAdmin } = useContext(AdminContext)
  const { employeeId } = useContext(EmployeeContext)
  const { id } = useParams()
  const [imageLocale, setImageLocale] = useState(NoImage)
  const [currentPost, setCurrentPost] = useState({})

  const [currentLikes, setCurrentLikes] = useState(0)
  const [currentDislikes, setCurrentDislikes] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      const data = await findPost(id)
      setCurrentPost(data)
      setIsLoading(false)
      setCurrentLikes(currentPost.likes)
      setCurrentDislikes(currentPost.dislikes)
    }
    fetchPost()
  }, [
    id,
    currentLikes,
    currentDislikes,
    currentPost.likes,
    currentPost.dislikes,
  ])

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      await deletePost(currentPost._id, employeeId).then(() =>
        history.replace('/home')
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'image') {
      var fReader = new FileReader()
      fReader.readAsDataURL(event.target.files[0])
      fReader.onload = function (e) {
        setImageLocale(e.target.result)
      }

      setCurrentPost({
        ...currentPost,
        [name]: event.target.files[0],
      })
    } else {
      setCurrentPost({ ...currentPost, [name]: value })
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    try {
      await updatePost(currentPost).then(() => history.replace('/home'))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCallBack = async (name) => {
    if (name === 'likes') {
      if (
        !currentPost.usersLiked.includes(employeeId) &&
        !currentPost.usersDisliked.includes(employeeId)
      ) {
        await fetchLike(id, 1, employeeId)
        setCurrentLikes(currentLikes + 1)
      } else if (currentPost.usersLiked.includes(employeeId)) {
        await fetchLike(id, 0, employeeId)
        setCurrentLikes(currentLikes - 1)
      }
    } else {
      if (
        !currentPost.usersLiked.includes(employeeId) &&
        !currentPost.usersDisliked.includes(employeeId)
      ) {
        await fetchLike(id, -1, employeeId)
        setCurrentDislikes(currentDislikes + 1)
      } else if (currentPost.usersDisliked.includes(employeeId)) {
        await fetchLike(id, 0, employeeId)
        setCurrentDislikes(currentDislikes - 1)
      }
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form className="container">
          <div style={{ marginTop: '80px' }} className="row">
            <div className="col-2"></div>
            <div className="col-8">
              {currentPost.imageUrl === '' ? (
                <img
                  style={{
                    width: '100%',
                    height: '350px',
                  }}
                  src={NoImage}
                  alt={currentPost._id}
                />
              ) : (
                <img
                  style={{
                    width: '100%',
                    height: '350px',
                  }}
                  src={currentPost.imageUrl}
                  alt={currentPost._id}
                />
              )}
            </div>
            <div className="col-2"></div>
          </div>

          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <label htmlFor="title" className="col-3 col-form-label">
                  {' '}
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control col-8"
                  id="title"
                  value={currentPost.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>

          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <label htmlFor="message" className="col-3 col-form-label">
                  Message
                </label>
                <textarea
                  className="form-control col-8"
                  id="message"
                  name="message"
                  rows="10"
                  required
                  onChange={handleChange}
                  value={currentPost.message}
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>

          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <label htmlFor="image" className="col-3 col-form-label">
                  Change Image
                </label>
                <input
                  type="file"
                  className="form-control col-8"
                  accept=".png,.jpeg, .jpg"
                  id="image"
                  name="image"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>

          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <label className="col-3 col-form-label"></label>
                <div className="col-8">
                  <img
                    style={{
                      width: '100%',
                      height: '220px',
                    }}
                    src={imageLocale}
                    alt={currentPost.title}
                  />
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>

          <div
            style={{
              marginTop: '80px',
              marginBottom: '150px',
            }}
            className="row"
          >
            <div className="col-2"></div>
            <div className="col-4">
              <Like
                likes={currentLikes}
                dislikes={currentDislikes}
                callBack={handleCallBack}
              />
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-6">
                  {(isAdmin || currentPost.employeeId === employeeId) && (
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
                <div className="col-6">
                  {(isAdmin || currentPost.employeeId === employeeId) && (
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </form>
      )}

      <Footer />
    </div>
  )
}
