import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(titulo, descricao, userName, categoria) {
    check(titulo, String);
    check(descricao, String);
    check(userName, String);
    check(categoria, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    TasksCollection.insert({
      name: titulo,
      description: descricao,
      createdAt: new Date(),
      user: {
        userId: this.userId,
        userName: userName,
      },
      status: "Cadastrada",
      categoria: categoria,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    TasksCollection.remove(taskId);
  },
  "tasks.setStatus"(taskId, status) {
    check(taskId, String);
    check(status, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    TasksCollection.update(taskId, {
      $set: {
        status: status,
      },
    });
  },
  "tasks.update"(taskId, name, description, categoria) {
    check(taskId, String);
    check(name, String);
    check(description, String);
    check(categoria, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }
    TasksCollection.update(taskId, {
      $set: {
        name: name,
        description: description,
        categoria: categoria,
      },
    });
  },
});
