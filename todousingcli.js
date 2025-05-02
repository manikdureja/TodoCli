#!/usr/bin/env node
const fs = require('fs')
const { Command } = require('commander')
const program = new Command()

program
  .name('todo')
  .description('Your daily tasks in your terminal')
  .version('0.8.0')

program
  .command('add')
  .description('Add a new to do')
  .argument('<task>', 'to do to add')
  .action((task) => { 
    var data = fs.readFileSync('./todo.json')
    var toDoObject = JSON.parse(data)

    const todo = {
      task: task,
      done: false
    }

    toDoObject.push(todo)

    var newTodo = JSON.stringify(toDoObject)
    fs.writeFile('./todo.json', `${newTodo}\n`, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Task added')
      }
    })
  })

program
  .command('show-tasks')
  .description('List all to dos')
  .action(() => {
    var data = fs.readFileSync('./todo.json')
    var toDoObject = JSON.parse(data)

    toDoObject.forEach((todo, index) => {
      console.log(
        `${index + 1}. ${todo.task} - ${todo.done ? 'Done' : 'Not done'}`
      )
    })
  })

program
  .command('mark-done')
  .description('Mark a task as done')
  .argument('<taskname>', 'task name to mark as done')
  .action((taskname) => {
    var data = fs.readFileSync('./todo.json')
    var toDoObject = JSON.parse(data)

    toDoObject.forEach((todo) => {
      if (todo.task === taskname) {
        todo.done = true
      }
    })

    var newTodo = JSON.stringify(toDoObject)
    fs.writeFile('./todo.json', `${newTodo}\n`, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Task marked as done')
      }
    })
  })

program
  .command('delete')
  .description('Delete a task')
  .argument('<taskname>', 'task name to delete')
  .action((taskname) => {
    var data = fs.readFileSync('./todo.json')
    var toDoObject = JSON.parse(data)

    var newToDoObject = toDoObject.filter((todo) => todo.task !== taskname)

    var newTodo = JSON.stringify(newToDoObject)
    fs.writeFile('./todo.json', `${newTodo}\n`, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Task deleted')
      }
    })
  })

program
  .command('clear')
  .description('Clear all tasks')
  .action(() => {
    fs.writeFile('./todo.json', '', (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('All tasks cleared')
      }
    })
  })

program.parse()