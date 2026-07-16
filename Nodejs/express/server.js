const express = require("express");
const app = express();
app.use(express.json());
const students = [
    { id: 1, name: "Aman", age: 21, course: "MERN" },
    { id: 2, name: "Ravi", age: 22, course: "Java" },
    { id: 3, name: "Sita", age: 20, course: "React" },
    { id: 4, name: "Aman", age: 23, course: "Java" },
];

app.get("/", (req, res) => {
    res.send("This is the home page");
});
app.post("/login",(req,res)=>{
    res.status(200).json({"messge":"Login successful"});
})

app.post("/add",(req,res)=>{
    const {name,age,course}=req.body;
    const newStudent={
        id:students.length+1,
        age:age,
        name:name,
        course:course
    };
    students.push(newStudent);
    res.status(200).json({students});
})

app.get("/student/:name/:course", (req, res) => {
    const name = req.params.name;
    const course = req.params.course;

    const student = students.find((item) => item.name === name && item.course === course);

    if (student) {
        res.send(student);
    } else {
        res.send("Student not found");
    }
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.patch('/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, course } = req.body;

    const student = students.find((item) => item.id === id);

    if (student) {
        student.name = name ?? student.name;
        student.age = age ?? student.age;
        student.course = course ?? student.course;
        res.status(200).json({ message: "Student updated", student });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

app.delete('/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex((item) => item.id === id);

    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.status(200).json({ message: "Student deleted", deletedStudent });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});