import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Inputs from "../components/Inputs"
import Button from '../components/Button'

type Inputs = {
    name: string,
    email: string,
    password: string
}

const Signup = () => {
    const [inputs, setInputs] = useState<Inputs | null>(null)
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
        setInputs((prev: Inputs | any) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post('http://localhost:8080/api/auth/signup', inputs).then(() => {
            navigate('/login')
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[360px] min-h-[20px] p-[22px] bg-[var(--blue)] rounded-md shadow-md">
        <h3 className="text-[var(--white)] text-center font-semibold text-[20px]">
            SIGNUP
        </h3>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-5">
                <Inputs change={handleChange} name="username" type="text" placeholder="Username" />
                <Inputs change={handleChange} name="email" type="email" placeholder="Email" />
                <Inputs change={handleChange} name="password" type="password" placeholder="Password" />
            </div>
            <p className="text-end mt-3 text-[12px] font-medium">
                Already have an account? {" "}
                <Link 
                    to="/login"
                    className='text-[var(--white)] underline ml-1'
                >
                    login
                </Link>
            </p>
            <div className="mt-5 flex justify-center">
                <Button type="Signup" />
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
