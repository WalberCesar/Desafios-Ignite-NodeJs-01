import fs from 'fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
export class Database {

     #database = {}

     constructor() {
        
            fs.readFile(databasePath, 'utf-8').then(data => {
                this.#database = JSON.parse(data)
            }).catch(
                () => this.#persist()
            )
     }
            
    

     #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
     }

     update(table,id,data){
        const rowIndex = this.#database[table].findIndex((row) => {
            return row.id === id
        })

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
     }

     insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else {
            this.#database[table] = [data]
        }

        this.#persist()
        
     }

     select(table,search){
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => {
              return Object.entries(search).some(([key, value]) => {
                if (!value) return true
      
                return row[key].includes(value)
              })
            })
          } 

        return data
     }

     selectTask(table, id){
 
            const rowIndex = this.#database[table].findIndex((row) => {
                return row.id === id
            })   

            if(rowIndex > -1) {
                const data = this.#database[table][rowIndex]
                return data
            }
     }


     delete(table,id){
        const rowIndex = this.#database[table].findIndex((row) => {
            return row.id === id
        })

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
     }
     complete(table,id,data){
        const rowIndex = this.#database[table].findIndex((row) => {
            return row.id === id
        })

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
     }
}