const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.listen(3000,()=>{console.log('Server started!')})

const multer =  require('multer')
// var upload = multer({
//     dest: 'public/images/'
// })

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/images/')
    },
    filename:(req, file, cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
});

var upload = multer({
    storage: storage
})

app.get('/upload-file',(req,res)=> {
    res.render('upload');
})

//app.post('/upload-file',upload.single('image'), (req,res)=>{ // Singe File
app.post('/upload-file',upload.array('image',3), (req,res)=>{
    const image = req.files // single use req.file, multi use req.files
    const name = req.body.name
    res.send({image , name})
})