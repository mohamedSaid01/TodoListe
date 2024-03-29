import './database/index'
import todoRoutes from './routes/todoRoutes'
import  express, {Express, Request , Response} from 'express'
import  dotenv  from 'dotenv'
import bodyParser from 'body-parser'


dotenv.config()
const app = express()
const port=process.env.PORT

app.get('/',(req:Request ,res:Response) => res.send('Express + JavaScript'))

app.listen(port,() =>
  console.log(`Server is runing at ${port}`))

app.use(bodyParser.json()) //bch najm na9ra data eli yab3thheli 
app.use('/v1/api', todoRoutes)