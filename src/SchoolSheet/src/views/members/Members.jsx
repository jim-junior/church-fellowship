import React, { useState, useEffect } from 'react'
import '../../assets/styles/main.css'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { BsSearch } from 'react-icons/bs'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import Button2 from '../../components/Button2'
// import { FaFilter } from "react-icons/fa";
import ButtonAlt from '../../components/ButtonAlt'
import MembersTable from '../../components/members/MembersTable'
import { testMemberData } from '../../components/members/members'
import MostAbsent from '../../components/members/MostAbsent'
import NewMembers from '../../components/members/NewMembers'
import AbsentMembers from '../../components/members/AbsentMembers'
import axiosInstance from '../../axios-instance'
import { useDispatch, useSelector } from "react-redux"
import { getRegistrations, getMembers, getStaff } from '../../store/schoolSheetSlices/schoolStore'
import { useFeedback } from '../../hooks/feedback'



const Members = () => {
  const dispatch = useDispatch()
  const { registrations, members, staff } = useSelector((state) => state.fellowShipStore)
  const { toggleFeedback } = useFeedback()

  const [all, setAll] = useState(true);
  const [newm, setNew] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [most, setMost] = useState(false);

  useEffect(() => {
    dispatch(getMembers())
    dispatch(getRegistrations())
    dispatch(getStaff())
  }, [dispatch])





  const showAll = () => {
    setAll(true);
    setAbsent(false);
    setNew(false);
    setMost(false);
  }
  const showNew = () => {
    setAll(false);
    setAbsent(false);
    setNew(true);
    setMost(false);
  }
  const showAbsent = () => {
    setAll(false);
    setAbsent(true);
    setNew(false);
    setMost(false);
  }
  const showMost = () => {
    setAll(false);
    setAbsent(false);
    setNew(false);
    setMost(true);
  }





  return (
    <div className=" mt-2 w-full bg-white rounded-md shadow">

      <div className="p-3">
        <div className="flex justify-between">
          <div className='w-2/12'>
            <h1 className="text-secondary font-semibold text-2xl mt-5 ml-3">
              Members
            </h1>
          </div>
          <div className="w-4/12 ">
            <InputField
              type="text"
              placeholder="Search For Student ..."
              name="lastName"
              icon={
                <BsSearch
                  className="w-3 -ml-7 mt-3 cursor-pointer"
                  type="button"
                />
              }
            />
          </div>
          <div className='w-1/12'>

          </div>
          <div className="flex w-5/12 mt-5">
            <div className="" onClick={showAll}> {all ? <Button value={"All"} /> : <ButtonAlt value={"All"} />}  </div>
            <div className="ml-5" onClick={showNew}> {newm ? <Button value={"New"} /> : <ButtonAlt value={"New"} />} </div>
            <div className="ml-5" onClick={showAbsent}> {absent ? <Button value={"Staff Accounts"} /> : <ButtonAlt value={"Staff Accounts"} />} </div>
            {/* <div className="ml-5" onClick={showMost}> {most ? <Button value={"Most Abscent"} /> : <ButtonAlt value={"Most Abscent"} />} </div> */}
            {/* <ButtonAlt value={"All Members"} /> */}
          </div>

        </div>
        <div className="m-5">
          {all ? <MembersTable memberData={members} /> : null}
          {most ? <MostAbsent memberData={testMemberData} /> : null}
          {newm ? <NewMembers memberData={registrations} /> : null}
          {absent ? <AbsentMembers staff={staff} /> : null}
        </div>
      </div>
    </div>
  )
}

export default Members


