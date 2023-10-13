import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings, getMembers } from "../store/schoolSheetSlices/schoolStore";

const Attendance = () => {
    const dispatch = useDispatch();
    const { meetings, members } = useSelector(state => state.fellowShipStore);
    const [participants, setParticipants] = useState([]);
    const [absent, setAbsent] = useState([]);
    const [meeting, setMeeting] = useState({
        id: null,
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        participants: []
    });



    useEffect(() => {
        dispatch(getMeetings());
        dispatch(getMembers());
    }, [dispatch])

    useEffect(() => {
        if (meeting.id !== null) {
            const present = [];
            const notPresent = [];
            members.forEach((member) => {
                // check if member in meeting.participants
                const isPresent = meeting.participants.find((participant) => {
                    return participant.id === member.id
                })
                if (isPresent) {
                    present.push(member);
                } else {
                    notPresent.push(member);
                }
            });

            setParticipants(present);
            setAbsent(notPresent);
        }
    }, [meeting])


    return (
        <div className="p-5 rounded-md bg-white shadow h-[90vh] overflow-y-auto">
            <p className="text-2xl font-semibold text-secondary">Attendance</p>

            <div>
                <div className="flex justify-between mt-5">

                </div>
                <div className="flex mt-5">
                    {meetings.map((meet) => {
                        /* if (
                            new Date(meet.start_time).getTime() >
                            new Date().getTime()
                        ) {
                            return null;
                        } */
                        return (
                            <div
                                className={
                                    "p-5 rounded-md cursor-pointer bg-gray1 hover:bg-gray2 " +
                                    (meeting.id === meet.id ? "bg-gray3" : "")
                                }
                                onClick={() => {
                                    setMeeting(meet);
                                }}
                                title="Click to view attendance"
                            >
                                <p className="text-primary font-medium text-lg truncate">{
                                    new Date(meet.start_time).toDateString()
                                }</p>
                                <p className="text-gray text-sm">{meet.title}</p>
                                <p className="text-gray5 text-sm">{meet.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="flex mt-5">
                    <div className="w-1/2">
                        <p className="text-primary font-medium text-lg">Members attended</p>
                        <div className="flex bg-gray1 text-primary font-semibold mt-5">
                            <div className="p-2 w-1/3">
                                Name
                            </div>
                            <div className="p-2 w-1/3">
                                Email
                            </div>
                            <div className="p-2 w-1/3">
                                Number
                            </div>
                        </div>

                        {
                            participants.map((participant) => {
                                return (
                                    <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                                        <div className="p-2 w-1/3">
                                            {participant.full_name}
                                        </div>
                                        <div className="p-2 w-1/3">
                                            {participant.email}
                                        </div>
                                        <div className="p-2 w-1/3">
                                            {participant.phone_number}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-1/2 ml-5">
                        <p className="text-primary font-medium text-lg">Members Absent</p>
                        <div className="flex bg-gray1 text-primary font-semibold mt-5">
                            <div className="p-2 w-1/3">
                                Name
                            </div>
                            <div className="p-2 w-1/3">
                                Email
                            </div>
                            <div className="p-2 w-1/3">
                                Number
                            </div>

                        </div>

                        {
                            absent.map((participant) => {
                                return (
                                    <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                                        <div className="p-2 w-1/3">
                                            {participant.full_name}
                                        </div>
                                        <div className="p-2 w-1/3">
                                            {participant.email}
                                        </div>
                                        <div className="p-2 w-1/3">
                                            {participant.phone_number}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}
export default Attendance