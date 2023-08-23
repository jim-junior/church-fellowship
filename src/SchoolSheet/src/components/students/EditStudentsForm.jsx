import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import InputField from '../InputField'
import InputSelect from '../InputSelect'
import Button from '../Button'
import Select from 'react-select'
import { FaRegUserCircle, FaPhone } from 'react-icons/fa'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import axiosInstance from '../../axios-instance'
import { useNavigate } from 'react-router-dom'
import ButtonLoader from '../ButtonLoader'
import { extraLatestArrayIndex } from '../../utils/global'
import { useDispatch, useSelector } from 'react-redux'
import { getClassLevels, getFeesStructure, getStreams } from "../../store/schoolSheetSlices/schoolStore"

const EditStudentsForm = (props) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const studentId = searchParams.get('student')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [fatherContact, setFatherContact] = useState('')
  const [motherName, setMotherName] = useState('')
  const [motherContact, setMotherContact] = useState('')
  const [nationality, setNationality] = useState('')
  const [residence, setResidence] = useState('')
  const [photo, setPhoto] = useState(null)

  const [gender, setGender] = useState({})
  const [studentType, setStudentType] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [studentHouse, setStudentHouse] = useState('')
  const [studentSection, setStudentSection] = useState('')
  const [feesCategory, setFeesCategory] = useState('')
  const [studentTypes, setStudentTypes] = useState([])
  const [sections, setSections] = useState([])
  const [classes, setStudentClasses] = useState([])
  const [houses, setStudentHouses] = useState([])
  const [init] = useState(true)
  const dispatch = useDispatch()
  const {
    classLevels,
    fees,
    streams
  } = useSelector(state => state.schoolStore)
  const [classLevelOpts, setClassLevelOpts] = useState([])
  const [classLevel, setClassLevel] = useState(null)
  const [stream, setStream] = useState(null)
  const [feesData, setFeesData] = useState([])
  const [streamOpts, setStreamOpts] = useState([])

  useEffect(() => {
    const opts = fees.map((fee) => ({
      label: fee.name,
      value: fee.name,
      ...fee,
    }))
    setFeesData(opts)
  }, [fees])

  useEffect(() => {
    const opts = streams.map((stream) => ({
      label: stream.name,
      value: stream.name,
      ...stream,
    }))
    setStreamOpts(opts)
  }, [streams])

  useEffect(() => {
    const opts = classLevels?.map((level) => ({
      label: level.name,
      value: level.name,
      ...level,
    }))
    setClassLevelOpts(opts)
  }, [classLevels])



  useEffect(() => {
    dispatch(getClassLevels())
    dispatch(getFeesStructure())
    dispatch(getStreams())
  }, [dispatch])


  useEffect(() => {
    try {
      fetchSingleStudent()
      fetchStudentType()
      fetchSchoolClasses()
      fetchSchoolHouses()
      fetchSections()
    } catch (error) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          'An Error Occured while trying to fetch data for your Form. Please Refresh Page',
      })
    }
  }, [init])

  const fetchStudentType = () => {
    axiosInstance.get('/student-types').then((response) => {
      const { payload } = response.data

      const studenttypesArr = []
      for (let i = 0; i < payload.length; i++) {
        studenttypesArr.push({
          label: payload[i].type,
          value: payload[i].type,
          ...payload[i],
        })
      }
      setStudentTypes(studenttypesArr)
    })
  }

  const fetchSchoolClasses = () => {
    axiosInstance.get('/class').then((response) => {
      const { payload } = response.data
      const studentClassesArr = []
      for (let i = 0; i < payload.length; i++) {
        studentClassesArr.push({
          label: payload[i].class,
          value: payload[i].class,
          ...payload[i],
        })
      }
      setStudentClasses(studentClassesArr)
    })
  }

  const fetchSections = () => {
    axiosInstance.get('/sections').then((response) => {
      const { payload } = response.data
      const sectionsArr = []
      for (let i = 0; i < payload.length; i++) {
        sectionsArr.push({
          label: payload[i].section,
          value: payload[i].section,
          ...payload[i],
        })
      }
      setSections(sectionsArr)
    })
  }

  const fetchSchoolHouses = () => {
    axiosInstance.get('/houses').then((response) => {
      const { payload } = response.data
      const studentHousesArr = []
      for (let i = 0; i < payload.length; i++) {
        studentHousesArr.push({
          label: payload[i].house,
          value: payload[i].house,
          ...payload[i],
        })
      }
      setStudentHouses(studentHousesArr)
    })
  }

  // fetch student info
  const fetchSingleStudent = () => {
    axiosInstance.get(`/students/${studentId}`).then((response) => {
      const { status, payload } = response.data

      if (status === false) {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: payload,
        })
        return
      }

      setFirstName(payload.firstName)
      setMiddleName(payload.middleName)
      setLastName(payload.lastName)
      setEmail(payload.email)
      setPhoneNumber(payload.phoneNumber)
      setDateOfBirth(payload.dateOfBirth)
      setFatherName(payload.fatherName)
      setFatherContact(payload.fatherContact)
      setMotherName(payload.motherName)
      setMotherContact(payload.motherContact)
      setGender({
        label: payload.gender?.toUpperCase(),
        value: payload.gender,
      })
      setNationality(payload.nationality)
      setResidence(payload.residence)

      let type = extraLatestArrayIndex(payload.student_types)
      setStudentType({ label: type?.type, value: type?.type, ...type })

      let studentClass = extraLatestArrayIndex(payload.classes)
      setStudentClass({
        label: studentClass?.class,
        value: studentClass?.class,
        ...studentClass,
      })

      let house = extraLatestArrayIndex(payload.houses)
      setStudentHouse({ label: house?.house, value: house?.house, ...house })

      let fee = extraLatestArrayIndex(payload.fees)
      setFeesCategory({ label: fee?.name, value: fee?.name, ...fee })

      let section = extraLatestArrayIndex(payload.sections)
      setStudentSection({
        label: section?.section,
        value: section?.section,
        ...section,
      })

      if (payload.student_levels?.length > 0) {
        setClassLevel({
          label: payload.student_levels[0]?.name,
          value: payload.student_levels[0]?.name,
          ...payload.student_levels[0],
        })
      }
    })
  }

  const selectPhoto = (e) => {
    const { files } = e.target
    if (files && files[0]) {
      setPhoto(files[0])
    }
  }

  const updateStudentInfo = () => {
    setLoading(true)
    let data = {
      id: studentId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      gender: gender.value,
      nationality: nationality,
      residence: residence,
      fatherName: fatherName,
      fatherContact: fatherContact,
      motherName: motherName,
      motherContact: motherContact,
      studentType: studentType.id,
      studentSection: studentSection.id,
      studentHouse: studentHouse.id,
      studentClass: studentClass.id,
      feesCategory: feesCategory.id,
      studentLevel: classLevel.id,
    }

    const formdata = new FormData()
    // loop through the data object and get key and value
    for (const key in data) {
      formdata.append(key, data[key])
    }

    if (photo) {
      formdata.append('photo', photo)
    }

    axiosInstance
      .put(`students/edit`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const { status, payload } = response.data
        if (status === false) {
          setLoading(false)
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: payload,
          })
          return
        }
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        })
        navigate('/students')
      })
      .catch((error) => {
        setLoading(false)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text:
            'An Error Occured while trying to update student. Please try again',
        })
      })
  }

  const genderOptions = [
    {
      label: 'MALE',
      value: 'male',
    },
    {
      label: 'FEMALE',
      value: 'female',
    },
  ]

  return (
    <div className="bg-white h-[90vh] overflow-y-auto">
      <div className="flex bg-gray1 p-3 justify-between">
        <div>
          <p className="text-primary font-semibold text-md">Update Student</p>
        </div>
        <div>
          <Link to="/members">Back</Link>
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
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
            <InputSelect
              type="text"
              placeholder="Select Gender"
              label="Genders"
              name="gender"
              selectedOption={gender}
              onChange={setGender}
              options={genderOptions}
            />

            <InputField
              type="text"
              placeholder="Enter Occupation"
              label="Occupation"
              name="occupations"
              onChange={(e) => setNationality(e.target.value)}
              value={nationality}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter Middle Name"
              label="Middle Name"
              name="middleName"
              onChange={(e) => setMiddleName(e.target.value)}
              value={middleName}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
            <InputField
              type="text"
              placeholder="Enter Place Of Residence"
              label="Place Of Residence"
              name="residence"
              onChange={(e) => setResidence(e.target.value)}
              value={residence}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter Last Name"
              label="Last Name"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
            <InputField
              type="email"
              placeholder="Enter Email Address"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="date"
              label="Date Of Birth"
              name="dateOfBirth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
            />
            <InputField
              type="text"
              placeholder="Enter Your Phone Number"
              label="Phone Number"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              icon={<FaPhone className="w-3 -ml-7 mt-3" />}
            />
          </div>
        </div>
        <hr className="text-gray2" />
        <p className="text-secondary text-lg font-semibold ml-5 mt-5">
          Next of Kin
        </p>
        <div className="flex px-2 -mt-5">
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter NOK Name"
              label="Name"
              name="nok_name"
              onChange={(e) => setFatherName(e.target.value)}
              value={fatherName}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter NOK Contacts"
              label="Contact"
              onChange={(e) => setFatherContact(e.target.value)}
              value={fatherContact}
            />
          </div>
          <div className="w-1/4 p-2">
            <InputField
              type="text"
              placeholder="Enter Relationship"
              label="Relationship"
              name="motherName"
              onChange={(e) => setMotherName(e.target.value)}
              value={motherName}
              icon={<FaRegUserCircle className="w-3 -ml-7 mt-3" />}
            />
          </div>
        </div>

      </div>
      <div className="flex justify-between p-2">
        <div></div>
        {loading ? (
          <div>
            <ButtonLoader />
          </div>
        ) : (
          <div>
            <Button value={'Update Student'} />
          </div>
        )}
      </div>
    </div>
  )
}

export default EditStudentsForm
