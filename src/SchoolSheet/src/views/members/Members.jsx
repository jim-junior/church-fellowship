import React, { useState } from 'react'
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

const Members = () => {

  return (
    <div className=" mt-2 w-full">
      <div className="">
        <div className="p-3 bg-white shadow-md border border-gray2">
          <div className="flex justify-between">
            <div>
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
            <div className=""></div>
            <div className="flex mt-5">
              <div className="w-1/3"></div>
              <div className="w-1/3 relative mt">
                <div className="w-20" >
                  <ButtonAlt value={'Filter'} />
                </div>
                {/* <div className="bg-white shadow-lg mt-2 border border-gray2 z-50 rounded-md absolute w-56 p-3 h-auto">
                  <br />
                  <Select
                    placeholder={'Select class Levels'}
                    className="text-sm"
                    options={[]}
                  />
                  <br />
                  <Select
                    placeholder={'Select class'}
                    className="text-sm"
                    options={[]}
                  />
                  <br />

                  <Select
                    placeholder={'Sections'}
                    className="text-sm"
                    options={[]}
                  />
                  <br />
                  <Select
                    placeholder={'Student House'}
                    className="text-sm"
                    options={[]}
                  />

                  <br />
                  <Select
                    placeholder={'Student Type'}
                    className="text-sm"
                    options={[]}
                  />
                  <br />
                  <Select
                    placeholder={'Select Stream '}
                    className="text-sm"
                    options={[]}
                  />
                  <br />

                  <div
                    className=""
                  >
                    <Button value={'Clear Filters'} />
                  </div>
                </div> */}
              </div>
              <div className="w-1/3 mx-5">
                <div className="w-20">
                  <Button value={'Pdf'} />
                </div>
              </div>
              <div className="w-2/5">
                <Link to="/addMemberForm">
                  <Button2 value={'Member'} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <MembersTable memberData={testMemberData} />
        </div>
      </div>
    </div>
  )
}

export default Members
