import React from "react";

const Testimonies = () => {
    const tests = [
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "I thank God for provision and healing, we had to travel to America for treatment I thank God for provision and healing, we had to travel to America for treatment", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Akao", ln: "Teddy", email: "rob@gmail.com", des: "For school fees and success in exams for my daughter, i thank God for all", photo: "https://img.freepik.com/free-photo/portrait-cute-african-american-curly-young-woman-studio_23-2148183328.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.1.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Jeremy", ln: "Paul", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Kol", ln: "Ham", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/black-woman-s-portrait-wavy-hair-black-clothes_633478-1326.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.1.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
        { id: 1, fn: "Omeny", ln: "Robert", email: "rob@gmail.com", des: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 }
    ]
    return (
        <div className="bg-white shadow rounded-md p-5 h-[90vh] overflow-y-auto">
            <p className="text-lg font-semibold text-secondary">Testimonies</p>
            {tests.map((tes) => {
                return (
                    <div className="py-3 border-b border-gray1">
                        <div className="flex">
                            <img src={tes.photo} className="h-10 w-10 object-cover rounded-full" />
                            <div className="ml-2">
                                <p className="text-lg text-primary font-medium">{tes.fn} {tes.ln}</p>
                                <p className="font-light text-sm -mt-1">{tes.email}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray5 mt-2">{tes.des}</p>
                    </div>
                )
            })}

        </div>
    )
}

export default Testimonies