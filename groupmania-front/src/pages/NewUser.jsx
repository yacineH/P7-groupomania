import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { register } from '../services/authAPI'
import Logo from '../assets/dark-logoB.png'
import styled from 'styled-components'

const DivLogo = styled.div`
  display: flex;
  justify-content: center;
`
const StyledImage = styled.img`
  width: 250px;
  height: 200px;
`
const DivH2 = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ffd7d7;
`
const StyledH2 = styled.h2`
  margin: 0px;
  color: #4e5166;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
`
const StyledForm = styled.form`
  border: 1px solid #ffd7d7;
  height: 350px;
`
const DivButton = styled.div`
  margin-top: 35px;
  text-align: end;
  margin-right: 25px;
`
const StyledButton = styled.button`
  color: white;
  background-color: #fd2d01;
  width: 150px;
  height: 45px;
  border-radius: 15px;
  border: 1px solid #ffd7d7;
  font-size: 18px;
`
const DivMessage = styled.div`
  text-align: center;
  margin-top: 30px;
`

export default function NewUser() {
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
      <DivLogo>
        <StyledImage src={Logo} alt="Logo-groupomania" />
      </DivLogo>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <DivH2 className="col-8">
            <StyledH2>New Employee</StyledH2>
          </DivH2>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-2 m-0"></div>
          <StyledForm className="col-8 m-0" onSubmit={handleSubmit}>
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

            <DivButton>
              <StyledButton type="submit">Submit</StyledButton>
            </DivButton>
            <DivMessage>
              <p style={{ color: 'red' }}>{showMessage && message}</p>
            </DivMessage>
          </StyledForm>
          <div className="col-2 m-0"></div>
        </div>
      </div>
    </div>
  )
}
