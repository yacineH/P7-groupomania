import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import EmployeeContext from '../contexts/employeeContext'
import Footer from '../components/Footer'
import { persistPost } from '../services/postAPI'
import NonImage from '../assets/no-image.jpg'

function NewPost() {
      const history = useHistory()
      const { employeeId } = useContext(EmployeeContext)

      const [currentPost, setCurrentPost] = useState({
            employeeId: employeeId,
            title: '',
            message: '',
            image: null,
      })

      const [imageLocale, setImageLocale] = useState(NonImage)

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

      const handleSubmit = async (event) => {
            event.preventDefault()

            try {
                  await persistPost(currentPost)
                  history.replace('home')
            } catch (error) {
                  console.log(error)
            }
      }

      return (
            <div>
                  <Header />
                  <form
                        style={{ marginBottom: '200px', marginTop: '80px' }}
                        className="container"
                        onSubmit={handleSubmit}
                  >
                        <div
                              style={{
                                    border: '1px solid #ffd7d7',
                                    borderTopRightRadius: '20px',
                                    borderTopLeftRadius: '20px',
                                    backgroundColor: '#ffd7d7',
                              }}
                              className="row"
                        >
                              <div className="col-12">
                                    <h2
                                          style={{
                                                textAlign: 'center',
                                                margin: '0px',
                                                color: '#4e5166',
                                          }}
                                    >
                                          New Post
                                    </h2>
                              </div>
                        </div>
                        <div
                              style={{
                                    borderLeft: '1px solid #ffd7d7',
                                    borderRight: '1px solid #ffd7d7',
                                    paddingTop: '50px',
                              }}
                              className="row"
                        >
                              <label
                                    htmlFor="employeeId"
                                    className="col-4 col-form-label"
                              >
                                    Id
                              </label>
                              <input
                                    className="form-control col-7"
                                    type="text"
                                    id="employeeId"
                                    name="employeeId"
                                    value={employeeId}
                                    onChange={handleChange}
                                    readOnly
                              />
                        </div>
                        <div
                              style={{
                                    borderLeft: '1px solid #ffd7d7',
                                    borderRight: '1px solid #ffd7d7',
                              }}
                              className="row"
                        >
                              <label
                                    htmlFor="title"
                                    className="col-4 col-form-label mt-4"
                              >
                                    Titre
                              </label>
                              <input
                                    type="text"
                                    className="form-control col-7 mt-4"
                                    id="title"
                                    name="title"
                                    aria-describedby="titleHelp"
                                    onChange={handleChange}
                                    required
                              />
                        </div>
                        <div
                              style={{
                                    borderLeft: '1px solid #ffd7d7',
                                    borderRight: '1px solid #ffd7d7',
                              }}
                              className="row"
                        >
                              <label
                                    htmlFor="message"
                                    className="col-4 mt-4 col-form-label"
                              >
                                    Message
                              </label>
                              <textarea
                                    className="form-control col-7 mt-4"
                                    id="message"
                                    name="message"
                                    rows="5"
                                    onChange={handleChange}
                                    required
                              ></textarea>
                        </div>
                        <div
                              style={{
                                    borderLeft: '1px solid #ffd7d7',
                                    borderRight: '1px solid #ffd7d7',
                              }}
                              className="row"
                        >
                              <label
                                    htmlFor="image"
                                    className="col-4 mt-4 col-form-label"
                              >
                                    Image
                              </label>
                              <input
                                    type="file"
                                    className="form-control mt-4 col-7"
                                    accept=".png,.jpeg, .jpg"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                              />
                        </div>
                        <div
                              style={{
                                    borderLeft: '1px solid #ffd7d7',
                                    borderRight: '1px solid #ffd7d7',
                              }}
                              className="row"
                        >
                              <label className="col-4 col-form-label mt-4"></label>
                              <div className="col-7 mt-4">
                                    <img
                                          style={{ height: '100px' }}
                                          src={imageLocale}
                                          alt={currentPost.title}
                                    />
                              </div>
                        </div>
                        <div
                              style={{
                                    borderLeft: '1px solid #ffd7d7',
                                    borderRight: '1px solid #ffd7d7',
                                    borderBottomLeftRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                    borderBottom: '1px solid #ffd7d7',
                              }}
                              className="row"
                        >
                              <div className="col-7"></div>
                              <div
                                    style={{
                                          paddingTop: '50px',
                                          paddingBottom: '50px',
                                    }}
                                    className="col-4"
                              >
                                    <button
                                          style={{
                                                borderRadius: '20px',
                                                color: 'white',
                                                backgroundColor: '#fd2d01',
                                                padding: '5px',
                                                fontSize: '18px',
                                                border: '1px solid #ffd7d7',
                                                width: '150px',
                                          }}
                                          type="submit"
                                    >
                                          Submit
                                    </button>
                              </div>
                        </div>
                  </form>
                  <Footer />
            </div>
      )
}
export default NewPost
