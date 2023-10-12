import React, { useState } from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Button from '../Button'
import axiosInstance from '../../axios-instance'
import { useFeedback } from '../../hooks/feedback'
import { useDispatch } from 'react-redux'
import { getStaff } from '../../store/schoolSheetSlices/schoolStore'


const AbsentMembers = ({ staff }) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [middle_name, setMiddleName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [children, setChildren] = useState(0)
  const [isMother, setIsMother] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toggleFeedback } = useFeedback()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    if (!first_name || !last_name || !email || !phone_number || !password) {
      toggleFeedback("error", {
        title: "Error",
        text: "Please fill all fields",
      })
      return
    }

    try {
      setLoading(true)
      const response = await axiosInstance.post('/staff/create', {
        firstName: first_name,
        middleName: middle_name,
        lastName: last_name,
        email: email,
        password: password,
        phoneNumber: phone_number,
        isMother,
        children,
      })
      const { status, payload } = response.data

      if (status) {
        setLoading(false)
        toggleFeedback("success", {
          title: "Success",
          text: "Staff account created successfully",
        })
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setChildren(0)
        setIsMother(false)
        setPassword('')
        dispatch(getStaff())
      } else {
        setLoading(false)
        toggleFeedback("error", {
          title: "Error",
          text: payload,
        })
      }

    } catch (error) {
      toggleFeedback("error", {
        title: "Error",
        text: "Something went wrong, please try again",
      })
      setLoading(false)
    }
  }

  return (
    <div id="studentTable">
      <div className="h-[70vh] overflow-y-auto">

        {/* Create staff form */}
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Middle Name
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray1"
                id="grid-middle-name"
                type="text"
                placeholder="Middle Name"
                value={middle_name}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray1"
                id="grid-last-name"
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-phone-number"
              >
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-phone-number"
                type="text"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-children"
              >
                Children
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-children"
                type="number"
                placeholder="Children"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-isMother"
              >
                Is Mother (Check if true)
              </label>
              <input
                className="block bg-gray1 border border-gray1 rounded py-3 px-4 mb-3 leading-tight  "
                id="grid-isMother"
                type="checkbox"
                placeholder="Is Mother"
                checked={isMother}
                onChange={(e) => setIsMother(!isMother)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray1 text-gray5 border border-gray1 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <button
                className="bg-primary w-full text-center text-white font-bold py-2 px-4 rounded justify-center flex"
                type="button"
                onClick={handleSubmit}
              >
                {
                  loading ? <div className="loader"></div> : "Create Staff Account"
                }
              </button>

            </div>



          </div>
        </form>

        <table id="dmsk" className="mt-4 w-full table-auto">
          <thead style={{ backgroundColor: '#0d6dfd10' }}>
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">Email</th>
          </thead>
          <tbody>
            {staff?.map((member) => {
              return (
                <tr
                  className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                  key={member.id}
                >
                  <td className="flex pl-2">
                    <div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                      {member.first_name[0]}
                    </div>
                    <div>
                      <p className="text-sm p-3 -mt-1 text-gray5">
                        {member.first_name} {member.middle_name}{' '}
                        {member.last_name}
                      </p>
                      <p className="text-red text-xs -mt-3 ml-3">
                        00{member.id}
                      </p>
                    </div>
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {member.email}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AbsentMembers
