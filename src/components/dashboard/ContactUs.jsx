
import React, { useRef } from 'react'
import { toast } from 'react-toastify';


function ContactUs() {
    const form = useRef(null)
    // const [error, setError] = useState(null);
    // const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(form.current)
        const contactUs = Object.fromEntries(formData.entries())

        const response = await fetch('http://localhost:8080/api/contact-us', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactUs)
        })
        toast.success("Form submitted successfully!")
        form.current.reset()
    }
    return (
        <div
            className="w-screen flex items-start justify-center"
        >
        <div className="bg-white my-12 rounded-md w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-2/5">
            <div className="flex items-center justify-between bg-themeColor-400 text-white font-semibold rounded-t-md p-1">
                <h1 className="text-lg">Contact Us</h1>
            </div>
            <div className="w-full flex-1 p-14">
            <form onSubmit={handleSubmit} ref={form}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white" id="name" name="username" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white" id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="bg-green-500 py-2 px-8 text-white rounded-3xl">Submit</button>

            </form>
        </div>
        </div>
        </div>

    );
}

export default ContactUs;
