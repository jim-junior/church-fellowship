import React from 'react'
import Button from '../../components/Button'
import Select from 'react-select'
import { FcVideoCall, FcEndCall } from "react-icons/fc";

// A page for starting a zoom meeting
const StartMeeting = () => {
  return (
    <div className=" mt-2 w-full">

      <div className='flex bg-gray1 p-3 justify-between'>
        <div className="w-1/3">
          <Select
            className="w-1/2"
            placeholder="Select a Meeting"
            options={[
              { value: 'meeting1', label: 'Meeting 1' },
              { value: 'meeting2', label: 'Meeting 2' },
              { value: 'meeting3', label: 'Meeting 3' },
            ]}
          />
        </div>
        <div className="w-1/3 px-2">
          <Button
            value="Invite Meeting Members"
          />
        </div>
        <div className="w-1/3">
          <Button
            value="Start Meeting"
            icon={<FcVideoCall className="w-4 h-4 mt-[2px] text-white" />}
          />
        </div>
      </div>
      {/* Zoom meeting screen with call buttons */}
      <div className="flex mt-5 h-[70vh]">
        <div style={{
          background: "#1a1a1a"
        }} className="w-2/3 rounded-md shadow-md">
          <div className="flex justify-center items-center h-full">
            <p className="text-white text-2xl">Zoom Meeting Screen</p>
          </div>
        </div>

        {/* Members table */}
        <div className="w-1/3 h-full overflow-x-auto">
          <table id="dmsk" className="mt-4 w-full table-auto m-5">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <tr className="text-left">
                <th className="p-2 text-primary text-sm text-left">Name</th>
                <th className="p-2 text-primary text-sm text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                <td className=" text-xs p-3 text-gray5 flex pl-2">Tunde</td>
                <td className="pl-2">
                  <FcEndCall className="w-4 h-4 mt-[2px] text-red" />
                </td>
              </tr>

              <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                <td className="flex pl-2 text-xs p-3 text-gray5">John</td>
                <td className="pl-2">
                  <FcEndCall className="w-4 h-4 mt-[2px] text-red" />
                </td>
              </tr>

              <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                <td className="flex pl-2 text-xs p-3 text-gray5">Micheal</td>
                <td className="pl-2">
                  <FcEndCall className="w-4 h-4 mt-[2px] text-red" />
                </td>
              </tr>

              <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                <td className="flex pl-2 text-xs p-3 text-gray5">David</td>
                <td className="pl-2">
                  <FcEndCall className="w-4 h-4 mt-[2px] text-red" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>




    </div>
  )
}

export default StartMeeting