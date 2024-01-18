import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../../../db/TasksCollection.js";
import { useUsuario } from "../../hooks";

export function useTask(filtro) {
  const { user } = useUsuario();

  function getTasks(status) {
    let query;
    switch (status) {
      case "concluidas":
        query = { status: "Concluída" };
        break;
      case "emAndamento":
        query = { status: "Em andamento" };
        break;
      case "cadastradas":
        query = { status: "Cadastrada" };
        break;
      default:
        query = {};
        break;
    }
    return Meteor.subscribe("tasks").ready()
      ? TasksCollection.find(query).fetch()
      : undefined;
  }

  const {
    tasks,
    tasksCount,
    emAndamentoTasksCount,
    concluidasTasksCount,
    cadastradasTasksCount,
  } = useTracker(() => {
    if (!user) {
      return {
        tasks: undefined,
        tasksCount: undefined,
        emAndamentoTasksCount: undefined,
        concluidasTasksCount: undefined,
        cadastradasTasksCount: undefined,
      };
    }

    const allTasks = getTasks("todas");
    const emAndamentoTasks = getTasks("emAndamento");
    const concluidasTasks = getTasks("concluidas");
    const cadastradasTasks = getTasks("cadastradas");

    return {
      tasks: filtro ? getTasks(filtro) : undefined,
      tasksCount: allTasks ? allTasks.length : undefined,
      emAndamentoTasksCount: emAndamentoTasks
        ? emAndamentoTasks.length
        : undefined,
      concluidasTasksCount: concluidasTasks
        ? concluidasTasks.length
        : undefined,
      cadastradasTasksCount: cadastradasTasks
        ? cadastradasTasks.length
        : undefined,
    };
  });

  return {
    tasks,
    tasksCount,
    emAndamentoTasksCount,
    concluidasTasksCount,
    cadastradasTasksCount,
  };
}
