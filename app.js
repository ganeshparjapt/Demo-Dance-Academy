const express = require("express");
const bodyparser =  require("body-parser");
const path = require("path"); 
const app = express();

const mongoose = require('mongoose');
const { strict } = require("assert");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 8000;

//creat schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var contact= mongoose.model('contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(404).render('contact.pug', params);
})

//mongooes sue
app.post('/contact', (req, res)=>{ 
var myData = new contact(req.body);

myData.save().then(()=>{
    res.send("this dat ha ben saved to the data base")
}).catch(()=>{
    res.status(200).send("item was not save in data base")
});
})

//  res.status(200).render('contact.pug');

// app.post('/contact', (req, res)=>{
//     var myData = new Contact(req.body);
// })
//     myData.save().then(()=>{
//     res.send("This item has been saved to the database")
//     }).catch(()=>{
//     res.status(400).send("item was not saved to the databse")
// })



app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/ClassInfo', (req, res)=>{ 
    const params = { }
    res.status(200).render('ClassInfo.pug', params);
})
app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
});



// START THE SERVER
app.listen(port, ()=>{
    console.log(`successfully on port ${port}`);
});