import React from "react";
import { Link } from "react-router-dom";

const Notes = () => {
  const memberData = [
    { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "rob@gmail.com" },
    { id: 1, firstName: "Akao", lastName: "Teddy", contact: "07788787", email: "rob@gmail.com" },
    { id: 1, firstName: "Mukasa", lastName: "Solomon", contact: "0758999", email: "rob@gmail.com" },
    { id: 1, firstName: "Muwonge", lastName: "John", contact: "07788787", email: "rob@gmail.com" },
    { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "rob@gmail.com" },
    { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "rob@gmail.com" },
    { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "rob@gmail.com" },
  ]
  return (
    <div className="bg-white shadow rounded-md p-5 h-[90vh] overflow-y-auto">
      <p className="text-lg font-semibold text-secondary">Notes</p>
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
                      {member.firstName}
                      {member.lastName}
                    </p>
                    <p className="text-red text-xs -mt-3 ml-3">
                      00{member.id}
                    </p>
                  </div>
                </td>

                <td className="text-xs p-3 text-gray5">
                  {member.contact}
                </td>
                <td className="text-xs p-3 text-gray5">
                  email@gamil.com
                </td>
                <td className="text-xs p-3 text-gray5">
                  {member.email}
                </td>
                <td className="text-xs p-3 text-gray5">
                  email@gamil.com
                </td>
                <td className="text-xs p-3 text-gray5">
                  <Link to="/memberNotes">
                  <p className="p-2 bg-secondary text-white w-16 text-center rounded">Notes</p>
                  </Link>
                </td>

              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}
export default Notes;