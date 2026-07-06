import { useState } from "react";
import "../app.css";


function Form(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reg, setReg] = useState("");
    const [city, setCity] = useState("");
    const [option, setOption] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Enter your Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name"
                />
            </div>
            <div>
                <label>Enter your Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                />
            </div>
            <div>
                <label>Registration</label>
                <input 
                    type="text" 
                    value={reg} 
                    onChange={(e) => setReg(e.target.value)} 
                    placeholder="Registration"
                />
            </div>
            <div>
                <label>City</label>
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="City"
                />
            </div>
            <div>
                <label>Profession</label>
                <select value={option} onChange={(e) => setOption(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="Student">Student</option>
                    <option value="Scholar">Scholar</option>
                    <option value="Teacher">Teacher</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>

        {submitted && (
            <div>
                <h2>Submitted Details</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Registration:</strong> {reg}</p>
                <p><strong>City:</strong> {city}</p>
                <p><strong>Profession:</strong> {option}</p>
            </div>
        )}
        </>
    )
    
}

export default Form;