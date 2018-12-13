<template>
  <div class="container" id="app">
    <h3>Todo App</h3>
    <hr />
    <Todos />
  </div>
</template>

<script>
import Todos from "./components/Todos";

export default {
  name: "App",
  components: {
    Todos
  }
};
</script>

<style></style>
