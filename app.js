const cloudinary= require("cloudinary")
const dotenv=require("dotenv")
const express= require('express')
const app= express()
const bodyparser=require('body-parser')
const multer= require('multer')
const path= require('path')
const cookieparser=require("cookie-parser")
app.use(express.json());
dotenv.config({ path: './config.env' });
const port=process.env.PORT||4000
require('./db/conn')
const post= require('./routes/post') 
const auth= require('./routes/auth') 
app.use(bodyparser.urlencoded({extended: true}));

// app.use(bodyparser.json());
app.use('/client/uploads',express.static(path.join('client','uploads')))
const fileupload = require('express-fileupload'); 

app.use(fileupload({useTempFiles: true, tempFileDir: "/tmp/"}))

// app.use(require('./routes/auth'));

// const upload = multer({ dest: "client/uploads/" });



const cors= require('cors')


app.use(cookieparser())

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE']
  }));

// app.use(cors())


  
// const storage= multer.diskStorage({
//   destination:(req,file,callback)=>{
//       callback(null,"./client/uploads/");

//   },
//   filename:(req,file,callback)=>{
//       callback(null,file.originalname);
//   }
// })

// console.log("middleware")

// const upload=multer({storage:storage});
//   app.use(multer({
//     storage:storage
//     }).single('file'));


app.use('/api/users',auth)

app.use('/api',post)


cloudinary.config({
    cloud_name:"hhhhhhh",
    api_key:"867667916389474",
    api_secret:"J2q6B_j6be0PkOvZReLcdQNsyEA"
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("frontend1/build"));
}


app.listen(port,()=>{
    console.log(`server started on ${port}`)
})

// app.get('/',(req,res)=>{
//     res.send('hello from me')
// })