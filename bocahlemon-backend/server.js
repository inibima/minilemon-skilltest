import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/bocahlemon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('MongoDB connected');

const ApiSchema = new mongoose.Schema({
  name: String,
  developer: String,
  link: String,
  status: String,
  description: String,
  auth: String
});

const ApiModel = mongoose.model('Api', ApiSchema);

app.get('/api', async (req, res) => {
  const data = await ApiModel.find();
  res.json(data);
});

app.post('/api', async (req, res) => {
  const newApi = new ApiModel(req.body);
  await newApi.save();
  res.status(201).json(newApi);
});

app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));

// Proxy API untuk fetch dari berita-indo-api agar tidak kena CORS
import axios from 'axios';

const beritaBase = 'https://berita-indo-api-next.vercel.app';

app.get('/proxy-cnn-news', async (req, res) => {
  try {
    const { data } = await axios.get(`${beritaBase}/cnn-news`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal fetch CNN News' });
  }
});

app.get('/proxy-cnbc-news', async (req, res) => {
  try {
    const { data } = await axios.get(`${beritaBase}/cnbc-news`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal fetch CNBC News' });
  }
});

app.get('/proxy-tribun-news', async (req, res) => {
  try {
    const { data } = await axios.get(`${beritaBase}/tribun-news`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal fetch Tribun News' });
  }
});