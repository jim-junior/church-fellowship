import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Button2 from '../../components/Button2'
import InputField from '../../components/InputField'
import { BsSearch } from 'react-icons/bs'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { getMeetings } from '../../store/schoolSheetSlices/schoolStore'
import axiosInstance from '../../axios-instance'
import { useFeedback } from '../../hooks/feedback'


const Schedule = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { meetings } = useSelector((state) => state.fellowShipStore)

  useEffect(() => {
    dispatch(getMeetings())
  }, [dispatch])

  return (
    <div className='mt-2 w-full'>
      <SheduleMeetingFormModal open={open} onClose={() => setOpen(false)} />
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
                <Button2
                  onClick={() => setOpen(true)}
                  value={'Schedule Meeting'} />
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
                <th className="p-2 text-primary text-sm text-left">Start Time</th>
                <th className="p-2 text-primary text-sm text-left">End Time</th>
                <th className="p-2 text-primary text-sm text-left">Action</th>
              </tr>
            </thead>
            <tbody>


              {meetings.map((meeting) => (
                <tr className='shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2'>
                  <td className="flex pl-2 text-xs p-3 text-gray5" >{meeting.title}</td>
                  <td className="pl-2 text-xs p-3 text-gray5">{
                    (new Date(new Date(meeting.end_time) - new Date(meeting.start_time)) / 1000 / 60 / 60).toFixed(2)
                  } Hrs</td>
                  <td className="pl-2 text-xs p-3 text-gray5">{
                    new Date(meeting.start_time).toLocaleString()
                  }</td>
                  <td className="pl-2 text-xs p-3 text-gray5">{
                    new Date(meeting.end_time).toLocaleString()
                  }</td>
                  <td className="pl-2 text-xs p-3 text-gray5">
                    <MdDelete className="w-4 h-4 mt-[2px] text-red" />
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Schedule


function SheduleMeetingFormModal({ open, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDateTIme, setStartDateTIme] = useState('')
  const [endDateTIme, setEndDateTIme] = useState('')
  const [meetingLink, setMeetingLink] = useState('https://us05web.zoom.us/j/82866576528?pwd=SnlzdE5wVjRENk52V29mMmlZdW5UQT09')
  const [loading, setLoading] = useState(false)
  const { toggleFeedback } = useFeedback()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title,
      description,
      start_time: startDateTIme,
      end_time: endDateTIme,
      meeting_link: meetingLink
    }

    try {
      setLoading(true)

      const response = await axiosInstance.post('/meetings/create', data)

      const { status, payload } = response.data

      if (status) {
        dispatch(getMeetings())
        setLoading(false)
        toggleFeedback("success", {
          title: "Success",
          text: "Successfully created meeting"
        })
        onClose()
        return
      } else {
        setLoading(false)
        toggleFeedback("error", {
          title: "Error",
          text: payload
        })
        return
      }


    } catch (error) {
      setLoading(false)
      toggleFeedback("error", {
        title: "Error",
        text: error.message
      })
      return
    }
  }


  return (
    <div className={`${open ? 'fixed' : 'hidden'} top-0 left-0 w-full h-screen flex justify-center items-center bg-gray1 bg-opacity-50`}>
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-md shadow-md">
        <div className="flex justify-between items-center p-4 border-b border-gray1">
          <h1 className="font-semibold text-lg">Schedule Meeting</h1>
          <button onClick={onClose}>X</button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <InputField
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="datetime-local"
              placeholder="Start Date Time"
              name="startDateTIme"
              value={startDateTIme}
              onChange={(e) => {
                setStartDateTIme(e.target.value)
                setEndDateTIme(e.target.value)
              }}
            />
          </div>
          {/* 
          <div className="mb-4">
            <InputField
              type="datetime-local"
              placeholder="End Date Time"
              name="endDateTIme"
              value={endDateTIme}
              onChange={(e) => setEndDateTIme(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="text"
              placeholder="Meeting Link"
              name="meetingLink"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
          </div> */}
          <div className="flex justify-end">
            {
              loading ? <div className="loader w-6 h-6"></div> : <Button onClick={handleSubmit} value="Schedule" />
            }

          </div>
        </div>
      </div>
    </div>
  )


}