<template>
 <div>
    <h1>Todos</h1>
    <table>
      <thead>
        <tr>
          <th>Uid</th>
          <th>Описание</th>
          <th>Выполнена?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="index"> 
          <td>{{ todo.uid }}</td> 
          <td>{{ todo.description }}</td>
          <td>
            <span v-if="todo.is_completed">Выполнено</span> 
            <span v-else>Не выполнено</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>




<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
