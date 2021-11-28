const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'C#' },
    { id: 2, name: 'C++' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Unity' }
];

//====================================//
// ===========START GET ROUTER========//
//====================================//

app.get('/', (req, res) => {
    res.send("Hello Jennifer");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course)//send status code 404 resource not found
        return res.status(404).send('Course not found for requested id');
    
    res.send(`Course Found ${JSON.stringify(course)}`);

});

app.get('/api/posts/:year/:month/:day', (req, res) => {
    res.send(req.params);
});

//===================================//
// ===========END GET ROUTER=========//
//===================================//




//==================================//
//==========START POST ROUTER=======//
//==================================//
app.post('/api/courses', (req, res) => {

     //validation result
    const { error } = validateCourse(req.body);
    //if validation resdult found the error then return the 400 - Bad request
    if (error) 
       return  res.status(400).send(error.details[0].message);
        
    const course = {
            id : courses.length + 1,
            name : req.body.name
        }

        courses.push(course);
        res.send(courses);
});
//===================================//
// ===========END POST ROUTER========//
//===================================//


//==================================//
//==========START DELETE ROUTER=====//
//==================================//


app.delete('/api/courses/:id', (req, res) => {
     //lookup for course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if not found return 404 Resource not found
    if (!course)
     return   res.status(404).send('Course not found');
        
    courses.splice(courses.indexOf(course),1);
    res.send(courses);
});

//===================================//
// ===========END DELETE ROUTER======//
//===================================//



//==================================//
//==========START PUT ROUTER=====//
//==================================//
app.put('/api/courses/:id', (req, res) => {
    
    //lookup for course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if not found return 404 Resource not found
    if (!course) 
       return res.status(404).send('Course not found');
       
    
    //validation result
    const { error } = validateCourse(req.body);
    //if validation resdult found the error then return the 400 - Bad request
    if (error)
      return  res.status(400).send(error.details[0].message);

    //eveything is fine then update the course data and return the updated course to user
    course.name = req.body.name;
    res.send(courses);
});

//===================================//
// ===========END PUT ROUTER=========//
//===================================//


function validateCourse(course)
{
    
    //data validation schema
    const schema = {
      
      name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listeneing to port ${port}...`);
})