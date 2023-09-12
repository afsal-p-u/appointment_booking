import { useState } from 'react'
import { Link } from 'react-router-dom'

import Inputs from "../components/Inputs"
import Button from '../components/Button'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'

type Inputs = {
  email: string,
  password: string
}

const Login = () => {
  const [inputs, setInputs] = useState<Inputs | null>(null)
  const { setToken } = useAuthContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: Inputs | any) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handlSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post('http://localhost:8080/api/auth/login', inputs).then((res) => {
      setToken(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[360px] min-h-[20px] p-[22px] bg-[var(--blue)] rounded-md shadow-md">
        <h3 className="text-[var(--white)] text-center font-semibold text-[20px]">
            LOGIN
        </h3>
        <form onSubmit={handlSubmit}>
          <div className="flex flex-col gap-4 mt-5">
              <Inputs change={handleChange} type="text" placeholder="Email" name='email' />
              <Inputs change={handleChange} type="password" placeholder="Password" name='password' />
          </div>
          <p className="text-end mt-3 text-[12px] font-medium">
              Don't have an account? {" "}
              <Link 
                  to="/signup"
                  className='text-[var(--white)] underline ml-1'
              >
                  signup
              </Link>
          </p>
          <div className="mt-5 flex justify-center">
              <Button type="Login" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
