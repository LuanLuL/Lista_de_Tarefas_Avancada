import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users.register"(name, password, email) {
    check(name, String);
    check(password, String);
    check(email, String);

    if (Accounts.findUserByEmail(email)) {
      throw new Meteor.Error(
        "Registro falhou",
        "E-mail escolhido já está em uso no nosso sistema. Por favor, escolha um email diferente."
      );
    }

    if (Accounts.findUserByUsername(name)) {
      throw new Meteor.Error(
        "Registro falhou",
        "Nome de usuário escolhido já está em uso no nosso sistema. Por favor, escolha um nome de usuário diferente."
      );
    }

    Accounts.createUser({
      username: name,
      password: password,
      email: email,
    });
  },
  "users.setRegisterDatas"(data, genero, empresa, foto) {
    check(data, String);
    check(genero, String);
    check(empresa, String);
    check(foto, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    Meteor.users.update(this.userId, {
      $set: {
        profile: {
          dataNascimento: data,
          genero: genero,
          empresa: empresa,
          foto: foto,
        },
      },
    });
  },
});
