<template>
  <div class="row">
    <div class="col-sm-8">
      <div class="sys-msg">
        <span
          :class="LOADING.status == 'error' ? 'error' : 'success'"
          v-show="LOADING.status"
          >{{ LOADING.text }}</span
        >
      </div>
      <div>
        <p>
          Completed: <span>{{ COMPLETED.length }}</span> /
          <span>{{ TODOS.length }}</span>
        </p>
      </div>
      <ul class="list-group">
        <li class="list-group-item">
          <div class="input-group">
            <input
              @keydown.enter="addTodo();"
              type="text"
              v-model="todo.title"
              class="form-control"
              placeholder="New todo"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button
                class="btn btn-success"
                @click="addTodo();"
                type="button"
                id="button-addon2"
                :disabled="!fieldEmpty"
              >
                Add
              </button>
            </div>
          </div>
        </li>
        <li
          v-for="todo in TODOS"
          :key="todo.id"
          class="list-group-item"
          :class="todo.completed ? 'done' : ''"
        >
          <span
            @click="changeStatus(todo);"
            class="task-status"
            v-text="todo.completed ? '✔' : '🔳'"
          ></span>
          <input
            class="input"
            :id="todo.id"
            type="text"
            :value="todo.title"
            @keyup.enter="editTodo(todo);"
            :disabled="todo.completed"
          />
          <br />
          <span
            class="badge"
            :class="todo.completed ? 'badge-success' : 'badge-secondary'"
            v-text="todo.completed ? 'Done' : 'Pending'"
            >Done</span
          >
          <span @click="removeTodo(todo);" class="trash">🗑</span>
        </li>
      </ul>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "todos",
  data() {
    return {
      todo: {
        title: "",
        completed: false
      },
      editMode: false
    };
  },
  computed: {
    fieldEmpty() {
      return this.todo.title.toString().trim().length > 0;
    },
    ...mapGetters(["LOADING", "TODO", "TODOS", "COMPLETED", "INCOMPLETE"])
  },
  created() {
    this.$store.dispatch("GET_TODOS");
    this.todo = {
      title: ""
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("POST_TODO", this.todo);
      this.todo = {
        title: ""
      };
    },
    editTodo(todo) {
      let title = document.getElementById(todo.id).value;
      todo.title = title;
      this.$store.dispatch("PUT_TODO", todo);
    },
    changeStatus(todo) {
      todo.completed = !todo.completed;
      this.$store.dispatch("PUT_TODO", todo);
    },
    removeTodo(todo) {
      this.$store.dispatch("DELETE_TODO", todo);
    }
  }
};
</script>

<style>
.trash {
  cursor: pointer;
  margin-left: 5px;
}
.sys-msg {
  height: 40px;
  display: flex;
  align-items: center;
}

.sys-msg span {
  border: 1px solid #ddd;
  padding: 2px 5px;
  border-radius: 3px;
}
.done input {
  text-decoration: line-through;
}
.task-status {
  cursor: pointer;
  float: right;
  margin-top: 15px;
}
.input {
  border: 1px solid transparent;
  padding: 5px;
  width: calc(100% - 40px);
}
.input:disabled {
  background: #fff;
}
.input.edit-mode {
  border: 1px solid #ddd;
  text-decoration: none;
}
.sys-msg span.success {
  color: #8bc34a;
  padding: 2px 10px;
  font-size: 12px;
  background: transparent;
}

.sys-msg span.error {
  color: #f44336;
  padding: 2px 10px;
  font-size: 12px;
  background: transparent;
}
</style>
