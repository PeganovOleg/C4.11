<template>
  <div class="container">
    <div class="col-sm-10">
      <h1>Задачи</h1>
       
      
         <confirmation
      :message="confirmationMessage"
      :message2="confirmationMessage2"
      :message3="confirmationMessage3"

      v-if="showConfirmation"> 
    </confirmation>


     <button type="button"
        id="task-add"
        class="btn btn-success btn-sm align-left d-block"
        v-b-modal.todo-modal
        > 
  Добавить задачу
</button>
<div class="container">
<p id="task2"></p>
 </div>











      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>#</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>

       <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.description }}</td>
            <td>
              <span v-if="todo.is_completed">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button type="button"
 class="btn btn-success btn-sm align-left d-block"
         v-b-modal.todo-update-modal
        @click="updateTodo(todo)"> 
  Обновить
</button>
                &nbsp;
               <button type="button"
        class="btn btn-danger btn-sm"
        @click="deleteTodo(todo)">
  X
</button>
              </div>
            </td>
          </tr>
        </tbody>

      </table>




<b-modal ref="addTodoModal"
         id="todo-modal"
         title="Добавить задачу"
         hide-footer>
  
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-description-group"
                label="Описание:"
                label-for="form-description-input">
    <b-form-input id="form-description-input"
                  type="text"
                  v-model="addTodoForm.description"
                  required
                  placeholder="Завести задачу">
    </b-form-input>
  </b-form-group>
  <b-form-group id="form-complete-group">
    <b-form-checkbox-group v-model="addTodoForm.is_completed" id="form-checks">
      <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
    </b-form-checkbox-group>
    </b-form-group>
    <b-button type="submit" variant="primary">Добавить</b-button>
    <b-button type="reset" variant="danger">Сброс</b-button>
  </b-form>
</b-modal>





<b-modal ref="updateTodoModal"
         id="todo-update-modal"
         title="Update"
         hide-footer>
  <b-form @submit="onUpdateSubmit" @reset="onUpdateReset" class="w-100">
  <b-form-group id="form-update-description-group"
                label="Описание:"
                label-for="form-update-description-input">
    <b-form-input id="form-update-description-input"
                  type="text"
                  v-model="updateTodoForm.description"
                  required>
    </b-form-input>
  </b-form-group>
  <b-form-group id="form-update-complete-group">
    <b-form-checkbox-group v-model="updateTodoForm.is_completed" id="form-update-checks">
      <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
    </b-form-checkbox-group>
  </b-form-group>
  <b-button-group>
    <b-button type="submit" variant="primary">Обновить</b-button>
    <b-button type="reset" variant="danger">Сброс</b-button>
  </b-button-group>
  </b-form>
</b-modal>






    </div>
  </div>
</template>



<script>
import axios from 'axios';
import Confirmation from './Confirmation.vue'; 

const todoListURL = 'http://localhost:5000/api/tasks/';
const todoAddURL = 'http://localhost:5000/api/add-task/';
const dataURL = 'http://localhost:5000/api/tasks/';
let i;
let m;
m=0;
i=0;

export default {
  name: 'Todo',
  data() {
    return {
      todos: [],
      addTodoForm: {
        description: '',
        is_completed: [],
      },

updateTodoForm: { 
        uid: 0,
        description: '',
        is_completed: [],
      },

      confirmationMessage: '',
      confirmationMessage2: '',
      confirmationMessage3: '',
      showConfirmation: false,
    };
  },
  methods: {
    getTodos() {
      axios.get(todoListURL)
        .then((response) => {
          this.todos = response.data.tasks;
        });
    },
    
    resetForm() {
      this.addTodoForm.description = '';
      this.addTodoForm.is_completed = [];
      this.updateTodoForm.description = '';
      this.updateTodoForm.is_completed = [];
    },
  


    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const requestData = {
        description: this.addTodoForm.description,
        is_completed: this.addTodoForm.is_completed[0],
      };
      axios.post(todoAddURL, requestData)
        .then(() => {
           this.getTodos();
          this.confirmationMessage = `Задача "${requestData.description}" добавлена`;
          i=i+1;
          this.confirmationMessage2 = `Добавлено задач:${i} `;
          console.log(i);
          this.showConfirmation = true;
        })
      this.resetForm()
    },
 


    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },


  updateTodo(todo) { 
      this.updateTodoForm = todo;
      
    },
    onUpdateSubmit(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      const requestData = {
        description: this.updateTodoForm.description,
        is_completed: this.updateTodoForm.is_completed[0],
      };
      const todoURL = dataURL + this.updateTodoForm.uid; 
      axios.put(todoURL, requestData)
        .then(() => {
          this.getTodos();
          this.confirmationMessage = 'Задача обновлена';
          m=m+1;
          this.confirmationMessage3 = `Обновлено задач:${m} `;
          console.log(m);
          this.showConfirmation = true;
        });
    },


deleteTodo(todo) {
    const todoURL = dataURL + todo.uid;
    axios.delete(todoURL)
    .then(() => {
        this.getTodos();
        this.confirmationMessage = 'Задача удалена из списка';
        this.showConfirmation = true;
    });
},

    onUpdateReset(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      this.resetForm();
    },




  
  },



  components: { 
    confirmation: Confirmation,
  },
  created() {
    this.getTodos();
  },

   
};


</script>

<style>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1, td {
  text-align: left;
}
.todo-uid {
  text-align: right;
}
</style>