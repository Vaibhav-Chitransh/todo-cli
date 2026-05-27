import {Command} from 'commander';
import uniqid from 'uniqid';
import moment from 'moment';
import chalk from 'chalk';
import fs from 'fs';

const program = new Command();

const FILE_NAME = 'todos.json';
if(!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, '[]');
}

program
  .name('Todo CLI')
  .description('CLI based todo app')
  .version('1.0.0');


// So the structure of each todo will be like (todoId, title, isDone, createdAt)
// options to get, add, edit, delete and mark todo as done

program.command('add').description('add a new todo').argument('<title>', 'title to todo').action((str) => {
    const todoId = uniqid();
    const todoTitle = str;
    const isDone = false;
    const currTime = moment(Date.now()).format('Do MMM YYYY');

    const newTodo = {
        id: todoId,
        title: todoTitle,
        isCompleted: isDone,
        createdAt: currTime,
    }

    const data = fs.readFileSync(FILE_NAME, 'utf-8');
    const todos = JSON.parse(data);

    todos.push(newTodo);

    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2));
    console.log(chalk.green(`Todo with id: ${chalk.magenta.bold(todoId)} is successfully added.`));
});

program.command('edit').description('edit a todo title').argument('<id>', 'id of the todo you want to edit').argument('<updatedTitle>', 'give the updated title for the todo').action((id, updatedTitle) => {
    const data = fs.readFileSync(FILE_NAME, 'utf-8');
    const todos = JSON.parse(data);

    todos.map((todo) => {
        if(id == todo.id) todo.title = updatedTitle;
    });

    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2));
    console.log(chalk.yellow(`Todo with id: ${chalk.magenta.bold(id)} is successfully updated. New title: ${chalk.magenta.bold(updatedTitle)}`));
});

program.command('delete').description('delete a todo').argument('<id>', 'id of the todo you want to delete').action((id) => {
    const data = fs.readFileSync(FILE_NAME, 'utf-8');
    const todos = JSON.parse(data);

    const updatedTodos = todos.filter((todo) => id != todo.id);

    fs.writeFileSync(FILE_NAME, JSON.stringify(updatedTodos, null, 2));
    console.log(chalk.red(`Todo with id: ${chalk.magenta.bold(id)} is successfully deleted.`));
});

program.command('mark').description('mark todo as completed').argument('<id>', 'id of the todo you want to mark as completed').action((id) => {
    const data = fs.readFileSync(FILE_NAME, 'utf-8');
    const todos = JSON.parse(data);

    todos.map((todo) => {
        if(todo.id == id) todo.isCompleted = true;
    });

    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2));
    console.log(`Todo with id: ${chalk.magenta.bold(id)} is marked as completed.`);
});

program.command('display').description('get all todos').action(() => {
    const data = fs.readFileSync(FILE_NAME, 'utf-8');
    const todos = JSON.parse(data);

    console.log(`Displaying all todos-----`);
    console.log(`------------------------------------------`);
    for(let i=0; i<todos.length; i++) {
        console.log(`Id: ${todos[i].id}`);
        console.log(`Title: ${todos[i].title}`);
        console.log(`IsCompleted: ${todos[i].isCompleted}`);
        console.log(`CreatedAt: ${todos[i].createdAt}`);
        console.log(`------------------------------------------`);
    }
})

program.parse()