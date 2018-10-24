import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'


const dbUrl = 'mongodb://localhost/crud'
mongoose.connect(dbUrl, {useNewUrlParser: true})
  .then(() => console.log(`Connected to ${dbUrl}`))
const ImgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  url: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  }
})
const Img = mongoose.model("Img", ImgSchema)

const app = express()
const apiUrl = '/api/imgs'
app.use(bodyParser.json())
app.use(cors())

app.get(apiUrl, async (req, res) => {
  const imgs = await Img.find().select('-__v').sort("title")
  return res.send(imgs)
})
app.get(`${apiUrl}/:id`, async (req, res) => {
  console.log(req.params)
  const img = await Img.findById(req.params.id).select('-__v')
  if (img) {
    return res.send(img)
  } else {
    return res.status(404).send('invalidated Id')
  }
})
app.post(apiUrl, async (req,res) => {
  const { title, url } = req.body
  const img = new Img( {title, url} )
  await img.save()
  return res.send(img)
})
app.delete(`${apiUrl}/:id`, async (req, res) => {
  const img = await Img.findByIdAndRemove(req.params.id)
  if (img) {
    return res.send(img)
  } else {
    return res.status(404).send('The img with the given ID was not found.')
  }
})
app.put(`${apiUrl}/:id`, async (req, res) => {
    const { title, url } = req.body
    const img = await Img.findOneAndUpdate(
      
      req.params.id, 
      { title, url },
      { new: true }
    )

    if (img) {
      return res.send(img)
    } else {
      return res.status(404).send('The img with the given ID was not found.')
    }
  }
)


app.listen(8080, () => console.log(`listen on 8080`))
