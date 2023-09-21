import React, { useState } from "react";
import InputField from "../components/InputField";
import { BsFilter, BsSearch } from "react-icons/bs";
import Button from "../components/Button";

const Tithe = () => {

    const memberData1 = [
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "250,0000" },
        { id: 1, firstName: "Akao", lastName: "Teddy", contact: "07788787", email: "50,0000" },
        { id: 1, firstName: "Mukasa", lastName: "Solomon", contact: "0758999", email: "250,0000" },
        { id: 1, firstName: "Muwonge", lastName: "John", contact: "07788787", email: "20,0000" },
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "150,0000" },
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "50,0000" },
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "250,0000" },
    ]

    const memberData2 = [
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "250,0000" },
        { id: 1, firstName: "Akao", lastName: "Teddy", contact: "07788787", email: "50,0000" },
        { id: 1, firstName: "Mukasa", lastName: "Solomon", contact: "0758999", email: "250,0000" },
        { id: 1, firstName: "Muwonge", lastName: "John", contact: "07788787", email: "20,0000" },
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "150,0000" },
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "50,0000" },
        { id: 1, firstName: "Omeny", lastName: "Robert", contact: "07788787", email: "250,0000" },
    ]

    const [show, setShow] = useState(false);

    const toggleFilter = () => {
        setShow(!show)
    }

    const [show2, setShow2] = useState(false);

    const toggleFilter2 = () => {
        setShow2(!show2)
    }

    return (
        <div className="bg-white shadow flex rounded-md p-5 h-[90vh] overflow-y-auto">
            <div className="w-1/2">
                <p className="text-xl text-secondary font-medium">Tithe</p>
                <div className="flex justify-between mt-5">
                    <div className="flex w-[80%]">
                        <div className="w-full -mt-5">
                            <InputField placeholder="Search for user" icon={<BsSearch className="mt-3 mr-3" />} />
                        </div>
                        <div className="ml-5 w-20 ">
                            <Button value={"Search"} />
                        </div>
                    </div>
                    <div>
                        <BsFilter onClick={toggleFilter} className="text-3xl cursor-pointer text-secondary relative" />
                        {show ? <div className="p-2 z-50 absolute rounded-md -ml-52 shadow border border-gray1 bg-white flex">
                            <div>
                                <InputField type="date" />
                            </div>
                            <div className="ml-5">
                                <InputField type="date" />
                            </div>

                        </div> : null}

                    </div>


                </div>

                <table id="dmsk" className="mt-4 w-full table-auto">
                    <thead style={{ backgroundColor: '#0d6dfd10' }}>
                        <th className="p-2 text-primary text-sm text-left">Date</th>
                        <th className="p-2 text-primary text-sm text-left">Name</th>
                        <th className="p-2 text-primary text-sm text-left">Contact</th>
                        <th className="p-2 text-primary text-sm text-left">Amount</th>


                    </thead>
                    <tbody>
                        {memberData1?.map((member) => {
                            return (
                                <tr
                                    className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                                    key={member.id}
                                >
                                    <td className="text-xs p-3 text-gray5">
                                        20-09-2023
                                    </td>
                                    <td className="flex pl-2">

                                        <div>
                                            <p className="text-sm p-3 -mt-1 text-gray5">
                                                {member.firstName}
                                                {member.lastName}
                                            </p>

                                        </div>
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.contact}
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.email}
                                    </td>



                                </tr>
                            )
                        })}
                        <tr className="text-primary text-lg bg-gray1 font-bold">
                            <td colSpan="3" className="p-2">
                                Total
                            </td>
                            <td className="p-2">
                                2,509,000
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-1/2 ml-2">
                <p className="text-xl text-secondary font-medium">Offertory</p>
                <div className="flex justify-between mt-5">
                    <div className="flex w-[80%]">
                        <div className="w-full -mt-5">
                            <InputField placeholder="Search for user" icon={<BsSearch className="mt-3 mr-3" />} />
                        </div>
                        <div className="ml-5 w-20 ">
                            <Button value={"Search"} />
                        </div>
                    </div>
                    <div>
                        <BsFilter onClick={toggleFilter2} className="text-3xl cursor-pointer text-secondary relative" />
                        {show2 ? <div className="p-2 z-50 absolute rounded-md right-0 mr-5 shadow border border-gray1 bg-white flex">
                            <div>
                                <InputField type="date" />
                            </div>
                            <div className="ml-5">
                                <InputField type="date" />
                            </div>

                        </div> : null}

                    </div>


                </div>
                <table id="dmsk" className="mt-4 w-full table-auto">
                    <thead style={{ backgroundColor: '#0d6dfd10' }}>
                        <th className="p-2 text-primary text-sm text-left">Date</th>
                        <th className="p-2 text-primary text-sm text-left">Name</th>
                        <th className="p-2 text-primary text-sm text-left">Contact</th>
                        <th className="p-2 text-primary text-sm text-left">Amount</th>


                    </thead>
                    <tbody>
                        {memberData2?.map((member) => {
                            return (
                                <tr
                                    className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                                    key={member.id}
                                >
                                    <td className="text-xs p-3 text-gray5">
                                        20-09-2023
                                    </td>
                                    <td className="flex pl-2">

                                        <div>
                                            <p className="text-sm p-3 -mt-1 text-gray5">
                                                {member.firstName}
                                                {member.lastName}
                                            </p>

                                        </div>
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.contact}
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.email}
                                    </td>



                                </tr>
                            )
                        })}
                        <tr className="text-primary text-lg bg-gray1 font-bold">
                            <td colSpan="3" className="p-2">
                                Total
                            </td>
                            <td className="p-2">
                                2,509,000
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tithe