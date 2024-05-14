
import cors from 'cors'

const ACCEPTED_ORIGINS_0 = [
  'http://localhost:3000',
  'http://localhost:1234',
  'http://107.152.42.60:3000',
  'http://107.152.42.60:80',
  'http://107.152.42.60',
  'http://80.233.37.117',
  'http://172.20.10.15',
  'http://172.20.10.2'
  
]

const ACCEPTED_ORIGINS = ['*']

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
