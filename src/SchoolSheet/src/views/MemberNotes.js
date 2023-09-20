import React from "react";

const MemberNotes = () => {
    return (
        <div className="bg-white shadow rounded-md p-5 h-[90vh] overflow-y-auto">
            <p className="text-xl font-semibold text-secondary">Omeny Robert</p>

            <div className="p-2 bg-gray2 rounded mt-5 w-60">
                <p className="text-primary font-medium text-lg">Thursday 30th Jul</p>
                <p className="font-light text-sm">Thursday 30th Jul</p>
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