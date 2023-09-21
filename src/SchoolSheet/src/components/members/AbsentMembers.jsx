import React from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Button from '../Button'

const AbsentMembers = (props) => {
  const {
    memberData,
    deleteMemberInfo,
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
          </thead>
          <tbody>
            {memberData?.map((member) => {
              return (
                <tr
                  className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                  key={member.id}
                >
                  <td className="flex pl-2">
                    <div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                      {member.firstName[0]} {member.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm p-3 -mt-1 text-gray5">
                        {member.firstName} {member.middleName}{' '}
                        {member.lastName}
                      </p>
                      <p className="text-red text-xs -mt-3 ml-3">
                        00{member.id}
                      </p>
                    </div>
                  </td>

                  <td className="text-xs p-3 text-gray5">
                    {member.residence}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    email@gamil.com
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    {member.gender}
                  </td>
                  <td className="text-xs p-3 text-gray5">
                    email@gamil.com
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
