import Vue from "vue";
import Vuex from "vuex";
import todoService from "@/services/todo.services";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: {
      text: "idle",
      status: false
    },
    todo: {
      id: null,
      title: "",
      completed: false
    },
    todos: null
  },
  getters: {
    LOADING: state => {
      return state.loading;
    },
    TODO: state => {
      return state.todo;
    },
    TODOS: state => {
      return state.todos;
    },
    COMPLETED: state => {
      return state.todos.filter(todo => todo.completed);
    },
    INCOMPLETE: state => {
      return state.todos.filter(todo => todo.completed == false);
    }
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
    SET_TODO: (state, payload) => {
      state.todo = payload;
    },
    SET_TODOS: (state, payload) => {
      state.todos = payload;
    },
    ADD_TODO: (state, payload) => {
      state.todos.push(payload);
      /*state.todo = {
        id: null,
        title: "",
        completed: false
      }; */
    },
    CHANGE_STATUS: (state, payload) => {
      payload.completed = !payload.completed;
    },
    UPDATE_TODO: (state, payload) => {
      let objIndex = state.todos.findIndex(todo => todo.id == payload.id);
      state.todos[objIndex] = payload;
    },
    REMOVE_TODO: (state, payload) => {
      let objIndex = state.todos.findIndex(todo => todo.id == payload.id);
      state.todos.splice(objIndex, 1);
    }
  },
  actions: {
    POST_TODO(context, payload) {
      context.commit("SET_LOADING", {
        status: true,
        text: "Adding new Todo... ⛏"
      });
      todoService
        .post(payload)
        .then(data => {
          context.commit("ADD_TODO", data);
          context.commit("SET_LOADING", {
            status: true,
            text: "Todo added! 😁"
          });
        })
        .catch(error => {
          console.log("Whoops, " + error);
          context.commit("SET_LOADING", {
            status: "error",
            text: "😵 Whoops, " + error
          });
        });
    },
    GET_TODOS(context, payload) {
      context.commit("SET_LOADING", {
        status: true,
        text: "⛏ Loading Todos..."
      });
      todoService
        .getAll()
        .then(data => {
          context.commit("SET_TODOS", data);
          context.commit("SET_LOADING", { status: false, text: "Ready" });
        })
        .catch(error => {
          console.log("Whoops, " + error);
          context.commit("SET_LOADING", {
            status: "error",
            text: "😵 Whoops, " + error
          });
        });
    },
    PUT_TODO(context, payload) {
      context.commit("SET_LOADING", { status: true, text: "⛏ Updating..." });
      todoService
        .updateItem(payload)
        .then(data => {
          context.commit("UPDATE_TODO", data);
          context.commit("SET_LOADING", {
            status: true,
            text: "Todo updated! 😁"
          });
        })
        .catch(error => {
          console.log("Whoops, " + error);
          context.commit("SET_LOADING", {
            status: "error",
            text: "😵 Whoops, " + error
          });
        });
    },
    DELETE_TODO(context, payload) {
      context.commit("SET_LOADING", { status: true, text: "⛏ Deleting... " });
      todoService
        .deleteItem(payload)
        .then(() => {
          context.commit("SET_LOADING", {
            status: true,
            text: "Todo deleted! 😅"
          });
          context.commit("REMOVE_TODO", payload);
        })
        .catch(error => {
          console.log("Whoops, " + error);
          context.commit("SET_LOADING", {
            status: "error",
            text: "😵 Whoops, " + error
          });
        });
    }
  }
});

export default store;
