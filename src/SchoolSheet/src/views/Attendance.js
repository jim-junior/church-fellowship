import React from "react";
import Button from "../components/Button";

const Attendance = () => {
    const meetings = [
        { id: 1, name: "Gods Love for all", date: "Monday 10th Jun" },
        { id: 1, name: "All we need to hear from God", date: "Tuesday 11th Jun" },
        { id: 1, name: "The power of prayer", date: "Wednesday 12th Jun" },
        { id: 1, name: "Forgiveness", date: "Moday 10th Jun" },
        { id: 1, name: "Faith in Jesus", date: "Moday 10th Jun" },
        { id: 1, name: "Gods Love for all", date: "Sunday 15th Jul" },
    ]
    
    return (
        <div className="p-5 rounded-md bg-white shadow h-[90vh] overflow-y-auto">
            <p className="text-2xl font-semibold text-secondary">Attendance</p>

            <div>
                <div className="flex justify-between mt-5">
                    <div>
                        <Button value={"Previous"} />

                    </div>
                    <div>
                        <Button value={"Next"} />

                    </div>

                </div>
                <div className="flex mt-5">
                    {meetings.map((meet) => {
                        return (
                            <div className="p-2 bg-gray1 rounded w-1/6 m-2">
                                <p className="text-primary font-medium text-lg truncate">{meet.date}</p>
                                <p className="text-gray5 text-sm">{meet.name}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="flex mt-5">
                    <div className="w-1/2">
                        <p className="text-primary font-medium text-lg">Members attended</p>
                        <div className="flex bg-gray1 text-primary font-semibold mt-5">
                            <div className="p-2 w-1/4">
                                Name
                            </div>
                            <div className="p-2 w-1/4">
                                Email
                            </div>
                            <div className="p-2 w-1/4">
                                Number
                            </div>
                            <div className="p-2 w-1/4">
                                Checkin/out
                            </div>
                        </div>
                        <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                            <div className="p-2 w-1/4">
                                Omeny Robert
                            </div>
                            <div className="p-2 w-1/4">
                                rob@gmail.com
                            </div>
                            <div className="p-2 w-1/4">
                                0758999454
                            </div>
                            <div className="p-2 w-1/4 text-secondary">
                                2:11 - 2:55
                            </div>
                        </div>
                        <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                            <div className="p-2 w-1/4">
                                Omeny Robert
                            </div>
                            <div className="p-2 w-1/4">
                                rob@gmail.com
                            </div>
                            <div className="p-2 w-1/4">
                                0758999454
                            </div>
                            <div className="p-2 w-1/4 text-secondary">
                                2:11 - 2:55
                            </div>
                        </div>
                        <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                            <div className="p-2 w-1/4">
                                Omeny Robert
                            </div>
                            <div className="p-2 w-1/4">
                                rob@gmail.com
                            </div>
                            <div className="p-2 w-1/4">
                                0758999454
                            </div>
                            <div className="p-2 w-1/4 text-secondary">
                                2:11 - 2:55
                            </div>
                        </div>
                        <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                            <div className="p-2 w-1/4">
                                Omeny Robert
                            </div>
                            <div className="p-2 w-1/4">
                                rob@gmail.com
                            </div>
                            <div className="p-2 w-1/4">
                                0758999454
                            </div>
                            <div className="p-2 w-1/4 text-secondary">
                                2:11 - 2:55
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 ml-5">
                        <p className="text-primary font-medium text-lg">Members Absent</p>
                        <div className="flex bg-gray1 text-primary font-semibold mt-5">
                            <div className="p-2 w-1/4">
                                Name
                            </div>
                            <div className="p-2 w-1/4">
                                Email
                            </div>
                            <div className="p-2 w-1/4">
                                Number
                            </div>
                            <div className="p-2 w-1/4">
                                Checkin/out
                            </div>

                        </div>
                        <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                            <div className="p-2 w-1/4">
                                Omeny Robert
                            </div>
                            <div className="p-2 w-1/4">
                                rob@gmail.com
                            </div>
                            <div className="p-2 w-1/4">
                                0758999454
                            </div>
                            <div className="py-2 pl-10 w-1/4 text-secondary">
                                X
                            </div>
                        </div>
                        <div className="flex hover:bg-gray1 border-b border-gray1 text-sm cursor-pointer text-gray5">
                            <div className="p-2 w-1/4">
                                Omeny Robert
                            </div>
                            <div className="p-2 w-1/4">
                                rob@gmail.com
                            </div>
                            <div className="p-2 w-1/4">
                                0758999454
                            </div>
                            <div className="py-2 pl-10 w-1/4 text-secondary">
                                X
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default Attendance