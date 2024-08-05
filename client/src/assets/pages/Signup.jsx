import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const { message } = await res.json()

      if (!res.ok) {
        throw new Error(message)
      }

      setLoading(false)
      toast.success(message)
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  

  return (
    <section className='px-5 xl:px-0'>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 ">
        <div className="grid ">
          {/* signup form */}
          <div className="rounded-l-lg lg:pxs-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className='text-primaryColor'>account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full pr-4 px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full pr-4 px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className='text-headingColor font-bold text-[16px] leading-7'>
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="mentor">Mentor</option>
                    <option value="recruitor">Recruitor</option>
                  </select>
                </label>
              </div>


              <div className="mt-7">
                <button
                  disabled={loading}
                  type='submit'
                  className="w-full bg-black text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? <HashLoader size={35} color='#fff' /> : 'SignUp'}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account? <Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
