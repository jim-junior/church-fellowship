import React, { useState } from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Button from '../Button'
import axiosInstance from '../../axios-instance'
import { useFeedback } from '../../hooks/feedback'
import { useDispatch } from 'react-redux'
import { getMembers } from '../../store/schoolSheetSlices/schoolStore'

const MembersTable = (props) => {
  const {
    memberData
  } = props

  return (
    <div id="studentTable">
      <div className="h-[70vh] overflow-y-auto">
        <div className='flex w-[60vw]'>
          <textarea className='h-32 bg-gray1 p-3 text-sm text-gray5 w-full'>
            Message to send
          </textarea>
          <div className='ml-5 w-52 mt-16'>
            <Button value={"Send Message"} />
          </div>
        </div>
        <table id="dmsk" className="mt-4 w-full table-auto">
          <thead style={{ backgroundColor: '#0d6dfd10' }}>
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">Phone Number</th>
            <th className="p-2 text-primary text-sm text-left">email</th>
            <th className="p-2 text-primary text-sm text-left">Children</th>
            <th className="p-2 text-primary text-sm text-left">Recommended By</th>
            <th className="p-2 text-primary text-sm text-left">Action</th>
          </thead>
          <tbody>
            {memberData?.map((member) => {
              return (
                <Memeber member={member} key={member.id} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MembersTable


function Memeber({ member }) {
  const [loading, setLoading] = useState(false)
  const { toggleFeedback } = useFeedback()
  const dispatch = useDispatch()



  async function createStaffAccoutForUser() {
    try {
      setLoading(true)
      const response = await axiosInstance.post(`/staff/create-account`, {
        userId: member.id
      })
      const { status, payload } = response.data
      if (status) {
        dispatch(getMembers())
        setLoading(false)
        toggleFeedback("success", {
          title: "Success",
          text: "Staff account created successfully"
        })
      } else {
        setLoading(false)
        toggleFeedback("error", {
          title: "Error",
          text: payload
        })
      }
    } catch (error) {
      setLoading(false)
      toggleFeedback("error", {
        title: "Error",
        text: "Something went wrong while creating staff account"
      })
    }
  }



  return (
    <tr
      className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
    >
      <td className="flex pl-2">
        <div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
          {member.full_name[0]}
        </div>
        <div>
          <p className="text-sm p-3 -mt-1 text-gray5">
            {member.full_name}
          </p>
          <p className="text-red text-xs -mt-3 ml-3">
            00{member.id}
          </p>
        </div>
      </td>

      <td className="text-xs p-3 text-gray5">
        {member.phone_number}
      </td>
      <td className="text-xs p-3 text-gray5">
        {member.email}
      </td>
      <td className="text-xs p-3 text-gray5">
        {member.children}
      </td>
      <td className="text-xs p-3 text-gray5">
        {member.ref}
      </td>
      <td className="text-xs p-3 text-gray5">
        {
          member.staffAccount ? (
            <p className='p-2 rounded-md bg-green text-white'>
              STAFF ACCOUNT
            </p>
          ) :
            loading ? <div className='loader2'></div> : (
              <p onClick={createStaffAccoutForUser} className='p-2 rounded-md bg-secondary text-white'>
                CHANGE INTO STAFF
              </p>
            )
        }
      </td>

    </tr>
  )
}