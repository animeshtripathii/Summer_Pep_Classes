import { useState } from "react";
import "../app.css";


function Form(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reg, setReg] = useState("");
    const [city, setCity] = useState("");
    const [option, setOption] = useState("");
    const [submittedData, setSubmittedData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            name,
            email,
            reg,
            city,
            option,
        };

        setSubmittedData((prevData) => [...prevData, newEntry]);

        setName("");
        setEmail("");
        setReg("");
        setCity("");
        setOption("");
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

        {submittedData.length > 0 && (
         
            <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" ,display:"flex",flexDirection:"row",gap:"10px"}}>
               <h2>Submitted Details</h2>
                {submittedData.map((entry, index) => (
                    <div key={index} style={{border: "1px solid #ccc", padding: "10px"}}>
                        <p><strong>Entry {index + 1}</strong></p>
                        <p><strong>Name:</strong> {entry.name}</p>
                        <p><strong>Email:</strong> {entry.email}</p>
                        <p><strong>Registration:</strong> {entry.reg}</p>
                        <p><strong>City:</strong> {entry.city}</p>
                        <p><strong>Profession:</strong> {entry.option}</p>
                    </div>
                ))}
            </div>
        )}
        </>
    )
    
}

export default Form;