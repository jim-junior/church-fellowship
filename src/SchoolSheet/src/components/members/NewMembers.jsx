import React, { useEffect, useState } from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import axiosInstance from '../../axios-instance'
import { useFeedback } from '../../hooks/feedback'
import { useDispatch } from "react-redux"
import { getRegistrations } from '../../store/schoolSheetSlices/schoolStore'

const NewMembers = (props) => {
  const {
    memberData,
    deleteMemberInfo,
  } = props
  const [memebers, setMembers] = useState([])





  return (
    <div id="studentTable">
      <div className="h-[70vh] overflow-y-auto">
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

export default NewMembers

function Memeber({ member }) {
  const [loading, setLoading] = useState(false)
  const { toggleFeedback } = useFeedback()
  const dispatch = useDispatch()

  async function approveUser() {

    try {
      setLoading(true)
      const response = await axiosInstance.post("/reg/approve", {
        registration_ref: member.registration_ref
      })
      const { status, payload } = response.data

      if (status) {
        dispatch(getRegistrations())
        toggleFeedback("success", {
          title: "Success",
          text: "User approved successfully"
        })
      } else {
        toggleFeedback("error", {
          title: "Ooops",
          text: payload
        })
      }

    } catch (error) {
      console.log(error)
      toggleFeedback("error", {
        title: "Ooops",
        text: "Error!!!, Failed to Approve User"
      })
    }
    setLoading(false)

  }

  return (
    <tr
      className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
      key={member.id}
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
      <td className="text-xs p-3 w-28 text-gray5 flex justify-between">
        {
          loading ? <div className='loader2'></div> : (
            <p onClick={approveUser} className='p-2 rounded-md bg-secondary text-white'>
              Approve
            </p>
          )
        }
      </td>
    </tr>
  )
}
