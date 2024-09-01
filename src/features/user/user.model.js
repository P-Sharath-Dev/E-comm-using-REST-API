export default class UserModel{

    constructor(_id, _name, _email, _password, _type){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.type = _type;
    }

    static login(email, password){
        const user = users.find(user => user.email == email && user.password == password)
        return user;
    }
    static signUp(name, email, password, type){
        const newUser = new UserModel(users.length+1, name, email, password, type);
        users.push(newUser);
        return newUser;
    }
}

export const users = [
    {
        id : 1,
        name : "Seller",
        email : "seller@gmail.com",
        password : 12345,
        type : "seller",
    }
];