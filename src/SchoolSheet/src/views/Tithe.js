import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { BsFilter, BsSearch } from "react-icons/bs";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../store/schoolSheetSlices/schoolStore";

const Tithe = () => {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.fellowShipStore);
    const [tithe, setTithe] = useState([]);
    const [offertory, setOffertory] = useState([]);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch])

    useEffect(() => {
        const tithe_ = transactions.filter((transaction) => transaction.transaction_type === "TITHE");
        const offertory_ = transactions.filter((transaction) => transaction.transaction_type === "OFFERTORY");
        setTithe(tithe_);
        setOffertory(offertory_);
    }, [transactions])





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
                        {tithe?.map((member) => {
                            return (
                                <tr
                                    className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                                    key={member.id}
                                >
                                    <td className="text-xs p-3 text-gray5">
                                        {
                                            new Date(member.created_at).toLocaleDateString()
                                        }
                                    </td>
                                    <td className="flex pl-2">

                                        <div>
                                            <p className="text-sm p-3 -mt-1 text-gray5">
                                                {member.user?.full_name}
                                            </p>

                                        </div>
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.user?.phone_number}
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.amount}
                                    </td>



                                </tr>
                            )
                        })}
                        <tr className="text-primary text-lg bg-gray1 font-bold">
                            <td colSpan="3" className="p-2">
                                Total
                            </td>
                            <td className="p-2">
                                {
                                    tithe.reduce((acc, curr) => acc + curr.amount, 0)
                                }
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
                        {offertory?.map((member) => {
                            return (
                                <tr
                                    className="shadow-sm border-l border-gray1 cursor-pointer hover:shadow-md hover:border-l-primary hover:border-l-2  pl-2"
                                    key={member.id}
                                >
                                    <td className="text-xs p-3 text-gray5">
                                        {
                                            new Date(member.created_at).toLocaleDateString()
                                        }
                                    </td>
                                    <td className="flex pl-2">

                                        <div>
                                            <p className="text-sm p-3 -mt-1 text-gray5">
                                                {member.user?.full_name}
                                            </p>

                                        </div>
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.user?.phone_number}
                                    </td>

                                    <td className="text-xs p-3 text-gray5">
                                        {member.amount}
                                    </td>



                                </tr>
                            )
                        })}
                        <tr className="text-primary text-lg bg-gray1 font-bold">
                            <td colSpan="3" className="p-2">
                                Total
                            </td>
                            <td className="p-2">
                                {
                                    offertory.reduce((acc, curr) => acc + curr.amount, 0)
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tithe