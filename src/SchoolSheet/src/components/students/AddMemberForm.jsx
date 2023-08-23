import React, { useState, useEffect } from 'react'
import Button from '../Button'
import InputField from '../InputField'
import InputSelect from '../InputSelect'
import Select from 'react-select'
import { FaRegUserCircle, FaPhone } from 'react-icons/fa'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import axiosInstance from '../../axios-instance'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSections } from '../../store/schoolSheetSlices/schoolStore'
import ButtonLoader from '../ButtonLoader'

const AddMemberForm = (props) => {
  const dispatch = useDispatch()
  const [init] = useState(true)
  const navigate = useNavigate()

  const [gender, setGender] = useState('')



  // student info form data
  const [studentInfo, setStudentInfo] = useState({})

  const onChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value })
  }

  // post student info
  const [isPosting, setIsPosting] = useState(false)


  return (
    <div className="bg-white h-[90vh] overflow-y-auto">
      <div className="flex bg-gray1 p-3 justify-between">
        <div>
          <p className="text-primary font-semibold text-md">Add Member</p>
        </div>
        <div>
          <Link to="/students">
            <p>Back</p>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-secondary text-lg font-semibold ml-5 mt-2">
          Member Identity
        </p>
        <div className="flex px-2 -mt-5">
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter First Name"
              label="First Name"
              name="firstName"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
            <InputSelect
              type="text"
              placeholder="Select Gender"
              label="Gender"
              name="gender"
              selectedOption={gender}
              onChange={setGender}
            />

            <InputField
              type="text"
              placeholder="Enter Occupation"
              label="Occupation"
              name="occupation"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter Middle Name"
              label="Middle Name"
              name="middleName"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />

            <InputField
              type="text"
              placeholder="Enter Place Of Residence"
              label="Place Of Residence"
              name="residence"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter Last Name"
              label="Last Name"
              name="lastName"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
            <InputField
              type="email"
              placeholder="Enter Email Address"
              label="Email"
              name="email"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="date"
              label="Date Of Birth"
              name="dateOfBirth"
              onChange={onChange}
            />

            <InputField
              type="text"
              placeholder="Enter Your Phone Number"
              label="Phone Number"
              name="phoneNumber"
              onChange={onChange}
              icon={<FaPhone className="w-3 -ml-7 mt-3" />}
            />
          </div>
        </div>
        <hr className="text-gray2" />
        <p className="text-secondary text-lg font-semibold ml-5 mt-5">
          Next Of Kin
        </p>
        <div className="flex px-2 -mt-5">
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter NOK Name"
              label="Name"
              name="nok_name"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter NOK Contact"
              label="Contact"
              name="nok_contact"
              onChange={onChange}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter NOK Relationship"
              label="Relationship"
              name="nok_relationship"
              onChange={onChange}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
        </div>

      </div>
      <div className="flex justify-between p-2 ">
        <div></div>
        <div>
          {isPosting ? (
            <ButtonLoader />
          ) : (
            <div>
              <Button value={'Add Student'} />
            </div>
          )}
        </div>
      </div>
      <br />
    </div>
  )
}

export default AddMemberForm
