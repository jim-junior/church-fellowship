import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Button2 from "../components/Button2";
import ButtonLoader from "../components/ButtonLoader";
import ButtonSecondary from "../components/ButtonSecondary"
import { FaMapMarkerAlt } from "react-icons/fa";
import { useFeedback } from "../hooks/feedback";
import axiosInstance, { UPLOADS_URL } from "../axios-instance";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../store/schoolSheetSlices/schoolStore";


const News = () => {
    const { toggleFeedback } = useFeedback();
    const dispatch = useDispatch();
    const { news } = useSelector(state => state.fellowShipStore);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch])

    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }

    // form 
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [date, setDate] = useState("")
    const [venue, setVenue] = useState("")
    const [photo, setPhoto] = useState(null)
    const [des, setDes] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("title", title)
            formData.append("subTitle", subTitle)
            formData.append("date", date)
            formData.append("venue", venue)
            formData.append("description", des)
            formData.append("photo", photo)

            const res = await axiosInstance.post("/news/create", formData)
            const { status, payload } = res.data

            if (status) {
                dispatch(getNews());
                toggleFeedback("success", {
                    title: "Success",
                    text: "News Created Successfully"
                })
                setLoading(false)
                setModal(false)
                setTitle("")
                setSubTitle("")
                setDate("")
                setVenue("")
                setPhoto(null)
            } else {
                toggleFeedback("error", {
                    title: "Error",
                    text: payload
                })
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            toggleFeedback("error", {
                title: "Error",
                text: "Something went wrong, please try again"
            })

        }
    }



    return (
        <div className="bg-white shadow relative w-full rounded-md p-5 h-[90vh] overflow-y-auto">

            <div className="flex justify-between">
                <div>
                    <p className="text-lg font-semibold text-secondary">News</p>
                </div>
                <div onClick={openModal}>
                    <Button2 value={"Create News"} />
                </div>
            </div>
            {modal ? <div className="absolute shadow-xl -mt-14 rounded-md border border-gray1 z-50 w-[80%] bg-white">
                <div className="flex p-3 bg-gray1 text-lg font-semibold text-primary justify-between">
                    <div>
                        <p>Create News</p>
                    </div>
                    <div>
                        <p onClick={closeModal} className="cursor-pointer">X</p>
                    </div>

                </div>
                <div className="flex">
                    <div className="w-1/4 p-2">
                        <InputField
                            label="Title"
                            placeholder="Enter News Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="w-1/4 p-2">
                        <InputField
                            label="Sub Title"
                            placeholder="Enter Sub Title"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                        />
                    </div>

                    <div className="w-1/4 p-2">
                        <InputField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                        />
                    </div>

                    <div className="w-1/4 p-2">
                        <InputField
                            label="Venue"
                            placeholder="Venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        />
                    </div>

                </div>
                <div className="flex">
                    <div className="w-1/4 p-2">
                        <InputField
                            label="Photo"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                setPhoto(file)
                            }}
                        />
                    </div>
                    <div className="w-2/4 p-2 mt-14">
                        <textarea
                            className="text-sm text-gray5 h-32 w-full bg-gray1"
                            placeholder="Enter description here"
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                        >
                            Enter description here
                        </textarea>

                    </div>



                    <div className="w-20 mt-14 p-2">

                    </div>

                </div>
                <div className="flex p-3 bg-gray1 text-lg font-semibold text-primary justify-between">
                    <div onClick={closeModal}>
                        <ButtonSecondary value={"close"} />
                    </div>
                    <div className="w-20">
                        {
                            loading ? <ButtonLoader /> : <Button onClick={handleSubmit} value={"Save"} />
                        }
                    </div>

                </div>
            </div> : null}

            <div className="flex flex-wrap">
                {news.map((n) => {
                    return (
                        <div className="w-1/2">
                            <div className="flex rounded-md border border-gray1 shadow p-2 m-2 h-52">
                                <div className="w-5/12">
                                    <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-7/12 ml-2">
                                    <p className="text-primary font-medium text-lg">{n.title}</p>
                                    <p className="text-gray5 text-sm">{n.sub_title}</p>
                                    <div className="my-3 flex justify-between">
                                        <p className="p-2 bg-secondary rounded-md text-white text-sm">{
                                            new Date(n.date).toLocaleDateString()
                                        }</p>
                                        <p className="text-sm flex"><FaMapMarkerAlt /> &nbsp; {n.location}</p>
                                    </div>
                                    <p className="text-sm font-light mt-5 text-gray5">{n.description}</p>

                                </div>
                            </div>

                        </div>
                    )
                })}


            </div>

        </div>
    )
}

export default News