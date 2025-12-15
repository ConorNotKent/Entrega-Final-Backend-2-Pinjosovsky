class UserService{
    constructor(UserManager){
        this.UserManager=UserManager
    }

    async registerUser(first_name, last_name, email, age, password, role){
        if(!first_name || !last_name || !email || !age || !password || !role){
            throw new Error("Falta informacion");
        }
        const user= await this.UserManager.registerUser(first_name, last_name, email, age, password, role)
        return user
    }

    async loginUser(username, password){
        if(!username || !password){
            throw new Error("Falta Informacion")
        }
        const user= await this.UserManager.loginUser(username, password)
        return user
    }


    async getCurrentUser(idU){
        if(!idU){
            throw new Error("No se ha detectado ningun ID")
        }
        const user= await this.UserManager.getCurrentUser(idU)
        return user
    }

    async updateUser(id, newInfo){
        if(!id || !newInfo){
            throw new Error("Falta informacion para actualizar el usuario")
        }
        const existe= await this.UserManager.findUserbyId(id)
        if(!existe){
            throw new Error("Este usuario no existe")
        }
        const user= await this.UserManager.updateUser(id, newInfo)
        return user
    }

    async deleteUser(idU){
        if(!idU){
            throw new Error("Falta el ID")
        }
        const existe= await this.UserManager.findUserbyId(idU)
        if(!existe){
            throw new Error("Este usuario no existe")
        }
        const userDelete= await this.UserManager.deleteUser(idU)
        return userDelete
    }
}

module.exports=UserService