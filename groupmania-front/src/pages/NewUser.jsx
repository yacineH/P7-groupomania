import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { register } from '../services/authAPI'
import Logo from '../assets/dark-logoB.png'

function NewUser() {
  const history = useHistory()
  const [credentiels, setCredentiels] = useState({
    email: '',
    password: '',
    name: '',
  })

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentiels({
      ...credentiels,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = await register(credentiels)

      if (data.name === 'ValidationError') setMessage('email existe dèja')
      else setMessage(data.message)
      setShowMessage(true)
      history.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{ width: '250px', height: '200px' }}
          src={Logo}
          alt="Logo-groupomania"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div
            style={{
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              backgroundColor: '#ffd7d7',
            }}
            className="col-8"
          >
            <h2
              style={{
                margin: '0px',
                color: '#4e5166',
                paddingTop: '15px',
                paddingBottom: '15px',
                textAlign: 'center',
              }}
            >
              New Employee
            </h2>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-2 m-0"></div>
          <form
            style={{
              border: '1px solid #ffd7d7',
              height: '350px',
            }}
            className="col-8 m-0"
            onSubmit={handleSubmit}
          >
            <div className="form-group row mt-4">
              <label htmlFor="name" className="col-4 col-form-label">
                Nom
              </label>
              <input
                type="text"
                name="name"
                className="form-control col-7"
                id="name"
                aria-describedby="nomHelp"
                onChange={handleChange}
              />
            </div>
            <div className="form-group row mt-4">
              <label htmlFor="email" className="col-4 col-form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="form-control col-7"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
            </div>
            <div className="form-group row mt-4">
              <label htmlFor="password" className="col-4 col-form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control col-7"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div
              style={{
                marginTop: '35px',
                textAlign: 'end',
                marginRight: '25px',
              }}
            >
              <button
                style={{
                  color: 'white',
                  backgroundColor: '#FD2D01',
                  width: '150px',
                  height: '45px',
                  borderRadius: '15px',
                  border: '1px solid #ffd7d7',
                  fontSize: '18px',
                }}
                type="submit"
              >
                Submit
              </button>
            </div>
            <div
              style={{
                textAlign: 'center',
                marginTop: '30px',
              }}
            >
              <p style={{ color: 'red' }}>{showMessage && message}</p>
            </div>
          </form>
          <div className="col-2 m-0"></div>
        </div>
      </div>
    </div>
  )
}

export default NewUser
