const {program} = require('commander');
const uniqid = require('uniqid');
const moment = require('moment');
const fs = require('fs');

const FILE_NAME = 'todos.json';
if(!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, '[]');
}

program
  .name('todo cli')
  .description('CLI to add, edit, delete your todos')
  .version('1.0.0');


// So the structure of each todo will be like (todoId, title, isDone, createdAt)
// options to get, add, edit, delete and mark todo as done

program.command('add').description('add a new todo').argument('<string>', 'title to todo').action((str) => {
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

    const data = fs.readFileSync('todos.json', 'utf-8');
    const todos = JSON.parse(data);

    todos.push(newTodo);

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    console.log(`Todo with id: ${todoId} is successfully added.`);
})

program.parse()