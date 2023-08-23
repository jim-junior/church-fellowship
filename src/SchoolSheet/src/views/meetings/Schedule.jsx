import React from 'react'
import Button from '../../components/Button'
import Button2 from '../../components/Button2'
import InputField from '../../components/InputField'
import { BsSearch } from 'react-icons/bs'
import { MdDelete } from "react-icons/md";

const Schedule = () => {
  return (
    <div className='mt-2 w-full'>
      <div>
        <div className="p-3 bg-white shadow-md border border-gray2">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-2xl mt-5 ml-3 text-secondary">
                Meetings
              </h1>
            </div>
            <div className="w-4/12 ">
              <InputField
                type="text"
                placeholder="Search For Meeting ..."
                name="lastName"
                icon={
                  <BsSearch
                    className="w-3 -ml-7 mt-3 cursor-pointer"
                    type="button"
                  />
                }
              />
            </div>
            <div className=""></div>
            <div className="flex mt-5">
              <div className="w-full">
                <Button2 value={'Schedule Meeting'} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-full overflow-x-auto">
          <table id="dmsk" className="mt-4 w-full table-auto m-5">
            <thead style={{ backgroundColor: '#0d6dfd10' }}>
              <tr className="text-left">
                <th className="p-2 text-primary text-sm text-left">Name</th>
                <th className="p-2 text-primary text-sm text-left">Duration</th>
                <th className="p-2 text-primary text-sm text-left">Time Out</th>
                <th className="p-2 text-primary text-sm text-left">Time Out</th>
                <th className="p-2 text-primary text-sm text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                <td className="flex pl-2 text-xs p-3 text-gray5" >Fisrt Meeting</td>
                <td className="pl-2 text-xs p-3 text-gray5">2 Hours</td>
                <td className="pl-2 text-xs p-3 text-gray5">8:30 AM</td>
                <td className="pl-2 text-xs p-3 text-gray5">10:30 AM</td>
                <td className="pl-2 text-xs p-3 text-gray5">
                  <MdDelete className="w-4 h-4 mt-[2px] text-red" />
                </td>
              </tr>
              <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                <td className="flex pl-2 text-xs p-3 text-gray5">Businness Plan</td>
                <td className="pl-2 text-xs p-3 text-gray5">3 Hours</td>
                <td className="pl-2 text-xs p-3 text-gray5">---</td>
                <td className="pl-2 text-xs p-3 text-gray5">---</td>
                <td className="pl-2">
                  <MdDelete className="w-4 h-4 mt-[2px] text-red" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Schedule