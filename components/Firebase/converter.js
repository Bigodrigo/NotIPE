//User converter
  //Vamos criar uma classe para enviar as infos da pessoa!
  export class User {
    constructor (email, name, password, uid, ) {
      this.email = email;
      this.name = name;
      this.password = password;
      this.uid = uid;
    }
    toString() {
      return this.email + ',' + this.name + ',' + this.password + ',' + this.uid;
    }
  }
  //Agora um conversor do FB para as infos do User
  export const userConverter = {
    toFirestore: (user) => {
        return {
          email: user.email,
          name: user.name,
          password: user.password,
          uid: user.uid,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.email, data.name, data.password, data.uid);
    }
};