const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.listen(3000,()=>{console.log('Server started!')})

const multer =  require('multer')
// var upload = multer({
//     dest: 'public/images/'
// })

const storageImage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/images/')
    },
    filename:(req, file, cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif' || file.mimetype == 'image/jpg'){
        return cb(null,true)
    }
    return cb(new Error('File not allow!'))
}

var upload = multer({
    storage: storageImage,
    fileFilter,
    limits:{fileSize:100*1024} //100kb
})

app.get('/upload-file',(req,res)=> {
    res.render('upload');
})

//app.post('/upload-file',upload.single('image'), (req,res)=>{ // Singe File
app.post('/upload-file',upload.array('image',3), (req,res)=>{ // multiple file in a Input
    const image = req.files // single use req.file, multi use req.files
    const name = req.body.name
    res.send({image , name})
})

const config = upload.fields([{
    name: 'image',
    maxCount: 2
},{
    name: 'avatar',
    maxCount:3
}])

app.get('/upload-file-multi-field',(req,res)=> {
    res.render('upload-multi-field');
})

app.post('/upload-file-multi-field', config, (req,res)=>{ 
    const image = req.files 
    const name = req.body.name
    res.send({image , name})
})