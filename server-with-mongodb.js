import { createApp } from './app.js'

import { Visit }  from './models/mongodb/Visit.js'
import { Restaurante } from './models/mongodb/Restaurante.js';


createApp({ Visit, Restaurante })