//User converter
  //Vamos criar uma classe para enviar as infos da pessoa!
  export class User {
    constructor (email, matricula, token) {
      this.email = email;
      this.matricula = matricula;
      this.token = token;
    }
    toString() {
      return this.email + ',' + this.matricula + ',' + this.token;
    }
  }
  //Agora um conversor do FB para as infos do User
  export const userConverter = {
    toFirestore: (user) => {
        return {
          email: user.email,
          matricula: user.matricula,
          token: user.token,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.email, data.matricula, data.token);
    }
};