
import React, { useRef} from 'react'

function ContactUs() {
    const form = useRef(null)
    // const [error, setError] = useState(null);
    // const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(form.current)
        const user = Object.fromEntries(formData.entries())

        const response = await fetch('http://localhost:8080/api/img/shop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        // const data = await response.json()
        // if (data?.error) {
        //     setError(data.error)
        //     return
        // }
        // else {
        //     toast.success("Login successful!")
        //     navigate("/home")
        // }
        localStorage.setItem("token", JSON.stringify({ token: data.token }))
    }
    return (
        <div className="container py-5 home-layout">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body card-bg">
                            <h2 className="text-center mb-4">Contact Us</h2>
                            <form onSubmit={handleSubmit} ref={form}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="USERname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" name="message" rows="5"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
