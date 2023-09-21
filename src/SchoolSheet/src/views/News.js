import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Button2 from "../components/Button2";
import ButtonLoader from "../components/ButtonLoader";
import ButtonSecondary from "../components/ButtonSecondary"
import { FaMapMarkerAlt } from "react-icons/fa";

const News = () => {

    const news = [
        { id: 1, venue: "Watoto Church", title: "Charity Outreach", subTile: "John 3:30", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },
        { id: 1, venue: "Kira play Ground", title: "Thanks giving", subTile: "Genesis 3:30", des: "Come and we thank God for his Goodness that day", date: "14th-09", photo: "https://images.pexels.com/photos/4867670/pexels-photo-4867670.jpeg?auto=compress&cs=tinysrgb&w=1600" },

        { id: 1, venue: "Online Radio", title: "Christiam Service", subTile: "Mathew 13:3", des: "Remembering the birth of Jesus", date: "1st-11", photo: "https://images.pexels.com/photos/7328448/pexels-photo-7328448.jpeg?auto=compress&cs=tinysrgb&w=1600" },

        { id: 1, venue: "Serena Hotel", title: "Baptism", subTile: "Being born again", des: "Kira Municipal cleaning on saturday 6pm", date: "21st-12", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },

        { id: 1, venue: "Equitorial", title: "Orphange visite", subTile: "Sharing Love", des: "Kira Municipal cleaning on saturday 6pm", date: "19th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },

        { id: 1, venue: "Watoto Church", title: "Prayer and Fasting", subTile: "The month of break through", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },
    ]

    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
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
                        <InputField label="Title" placeholder="Enter News Title" />
                    </div>
                    <div className="w-1/4 p-2">
                        <InputField label="Sub Title" placeholder="Enter Sub Title" />
                    </div>

                    <div className="w-1/4 p-2">
                        <InputField label="Date" type="date" />
                    </div>

                    <div className="w-1/4 p-2">
                        <InputField label="Venue" placeholder="Venue" />
                    </div>

                </div>
                <div className="flex">
                    <div className="w-1/4 p-2">
                        <InputField label="Photo" type="file" />
                    </div>
                    <div className="w-2/4 p-2 mt-14">
                        <textarea className="text-sm text-gray5 h-32 w-full bg-gray1">
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
                        <Button value={"Save"} />
                        <ButtonLoader />
                    </div>

                </div>
            </div> : null}

            <div className="flex flex-wrap">
                {news.map((n) => {
                    return (
                        <div className="w-1/2">
                            <div className="flex rounded-md border border-gray1 shadow p-2 m-2 h-52">
                                <div className="w-5/12">
                                    <img src={ n.photo} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-7/12 ml-2">
                                    <p className="text-primary font-medium text-lg">{n.title}</p>
                                    <p className="text-gray5 text-sm">{n.subTile}</p>
                                    <div className="my-3 flex justify-between">
                                    <p className="p-2 bg-secondary rounded-md text-white text-sm">{n.date}</p>
                                    <p className="text-sm flex"><FaMapMarkerAlt/> &nbsp; {n.venue}</p>
                                    </div>
                                    <p className="text-sm font-light mt-5 text-gray5">{n.des}</p>

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