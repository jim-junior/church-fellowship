import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../store/schoolSheetSlices/schoolStore";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.fellowShipStore);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div className="bg-white shadow rounded-md p-5 h-[90vh] overflow-y-auto">
      <p className="text-lg font-semibold text-secondary">Notes</p>
      <table id="dmsk" className="mt-4 w-full table-auto">
        <thead style={{ backgroundColor: '#0d6dfd10' }}>
          <th className="p-2 text-primary text-sm text-left">Full Name</th>
          <th className="p-2 text-primary text-sm text-left">Phone Number</th>
          <th className="p-2 text-primary text-sm text-left">Note</th>
        </thead>
        <tbody>
          {notes?.map((member) => {
            return (
              <tr
                className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                key={member.id}
              >
                <td className="flex pl-2">
                  <div className="rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3">
                    {member.user?.full_name[0]}
                  </div>
                  <div>
                    <p className="text-sm p-3 -mt-1 text-gray5">
                      {member.user?.full_name}
                    </p>
                    <p className="text-red text-xs -mt-3 ml-3">
                      00{member.id}
                    </p>
                  </div>
                </td>

                <td className="text-xs p-3 text-gray5">
                  {member.user.phone_number}
                </td>
                <td className="text-xs p-3 text-gray5">
                  {member.content}
                </td>
                {/* <td className="text-xs p-3 text-gray5">
                  <Link to="/memberNotes">
                    <p className="p-2 bg-secondary text-white w-16 text-center rounded">Notes</p>
                  </Link>
                </td> */}

              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}
export default Notes;