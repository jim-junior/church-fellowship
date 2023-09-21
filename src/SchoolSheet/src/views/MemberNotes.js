import React from "react";

const MemberNotes = () => {
    const meetings = [
        { id: 1, name: "Gods Love for all", date: "Monday 10th Jun" },
        { id: 1, name: "All we need to hear from God", date: "Tuesday 11th Jun" },
        { id: 1, name: "The power of prayer", date: "Wednesday 12th Jun" },
        { id: 1, name: "Forgiveness", date: "Moday 10th Jun" },
        { id: 1, name: "Faith in Jesus", date: "Moday 10th Jun" },
        { id: 1, name: "Gods Love for all", date: "Sunday 15th Jul" },
    ]
    return (
        <div className="bg-white shadow rounded-md p-5 h-[90vh] overflow-y-auto">
            <p className="text-xl font-semibold text-secondary">Omeny Robert</p>

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

            <div className="p-3">
                <p className="font-bold">
                    What is Lorem Ipsum?
                </p>
                <p className="text-sm text-gray5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                </p>


                <p className="font-bold"> Why do we use it?</p>
                <p className="text-sm text-gray5">  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

            </div>
        </div>
    )
}

export default MemberNotes