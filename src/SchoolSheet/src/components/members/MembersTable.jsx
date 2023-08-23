import React from 'react'
import '../../assets/styles/main.css'
import { MdDeleteOutline } from 'react-icons/md'
import { BsPencilSquare, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const MembersTable = (props) => {
  const {
    memberData,
    deleteMemberInfo,
  } = props

  return (
    <div id="studentTable">
      <div className="h-[70vh] overflow-y-auto">
        <table id="dmsk" className="mt-4 w-full table-auto">
          <thead style={{ backgroundColor: '#0d6dfd10' }}>
            <th className="p-2 text-primary text-sm text-left">Full Name</th>
            <th className="p-2 text-primary text-sm text-left">Residence</th>
            <th className="p-2 text-primary text-sm text-left">email</th>
            <th className="p-2 text-primary text-sm text-left">Gender</th>
            <th className="p-2 text-primary text-sm text-left">Action</th>
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

                  <td className="text-xs p-3 w-28 text-gray5 flex justify-between">
                    <MdDeleteOutline
                      className="text-red  w-4 h-4"
                      onClick={() => {
                        deleteMemberInfo(member)
                      }}
                    />
                    <Link
                      className="mx-3"
                      to={`/editStudentsForm?student=${member.id}`}
                    >
                      <BsPencilSquare className="text-warning h-4 w-4" />
                    </Link>
                    <Link
                      className=""
                      to={`/showStudentsForm?student=${member.id}`}
                    >
                      <BsEye className="text-primary h-4 w-4" />
                    </Link>
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

export default MembersTable
