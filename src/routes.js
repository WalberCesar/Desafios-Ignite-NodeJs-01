import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-rout-path.js'
import { dateFormatter } from './utils/date-formatter.js'
import { Console } from 'node:console'


const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
              
            const data = database.select('tasks') 
            
            res.end(JSON.stringify(data))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
            const { title,description,completed_at,created_at,update_at } = req.body
            
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at,
                created_at: dateFormatter(),
                update_at
            }

          

            database.insert('tasks', task)

            res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const { title,description,completed_at,created_at,update_at } = req.body
            const { id } = req.params

            console.log(req.body)
            
            const task = {
                title,
                description,
                completed_at,
                created_at,
                update_at: dateFormatter()
            }

          

            database.update('tasks',id,task)

            res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const { id } = req.params
            database.delete('tasks',id)
            res.writeHead(204).end()
        }
    }, {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req,res) => {
        
            const { id } = req.params

            const {title, description, created_at, update_at} = database.selectTask('tasks', id) 

            const task = { 
                title,
                description,
                created_at,
                update_at,
                completed_at:dateFormatter(), 
            }

             console.log(task)

            database.complete('tasks',id,task)

            res.writeHead(201).end()
        }
    }
]