import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrayerRequests } from "../store/schoolSheetSlices/schoolStore";

const img = "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais"

const Prayer = () => {
    const dispatch = useDispatch();
    const { prayerRequests } = useSelector(state => state.fellowShipStore);
    useEffect(() => {
        dispatch(getPrayerRequests());
    }, [dispatch])

    return (
        <div className="bg-white shadow rounded-md p-5 h-[90vh] overflow-y-auto">
            <p className="text-lg font-semibold text-secondary">Prayer Requests</p>
            {prayerRequests.map((tes) => {
                return (
                    <div className="py-3 border-b border-gray1">
                        <div className="flex">
                            <img src={img} className="h-10 w-10 object-cover rounded-full" />
                            <div className="ml-2">
                                <p className="text-lg text-primary font-medium">{tes.user.full_name}</p>
                                <p className="font-light text-sm -mt-1">{tes.user.email}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray5 mt-2">{tes.request}</p>
                    </div>
                )
            })}

        </div>
    )
}

export default Prayer