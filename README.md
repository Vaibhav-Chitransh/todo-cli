# Todo CLI

A simple command-line based Todo application built using Node.js.  
This CLI lets you manage your todos directly from the terminal with commands like add, edit, delete, mark completed, and display.

---

## Features

- Add new todos
- Edit existing todos
- Delete todos
- Mark todos as completed
- Display all todos
- Persistent storage using `todos.json`

---

## Tech Stack

- Node.js
- Commander.js
- Moment.js
- Uniqid
- File System (`fs`)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Vaibhav-Chitransh/todo-cli.git
cd todo-cli
```

Install dependencies:

```bash
npm install
```

---

## Setup CLI Command

Add this inside your terminal so you don't have to write `node index.js` again and again:

```bash
alias todo="node index.js"
```

Now you can use the CLI:

```bash
todo --help
```

---

## CLI Preview

![Todo CLI Help](/public/image.png)

---

## Available Commands

### Add a Todo

```bash
todo add "Learn Node.js"
```

---

### Edit a Todo

```bash
todo edit <id> "Updated title"
```

Example:

```bash
todo edit abc123 "Learn Express.js"
```

---

### Delete a Todo

```bash
todo delete <id>
```

---

### Mark Todo as Completed

```bash
todo mark <id>
```

---

### Display All Todos

```bash
todo display
```

---

## Todo Structure

Each todo is stored in the following format:

```json
{
  "id": "2bmjxtewuxmpo6n48b",
  "title": "Learn Node.js",
  "isCompleted": false,
  "createdAt": "27th May 2026"
}
```

---

## Project Structure

```bash
├── index.js
├── todos.json
├── package.json
└── README.md
```

---

## Example Output

```bash
Displaying all todos-----
------------------------------------------
Id: qwerty123
Title: Learn Node.js
IsCompleted: false
CreatedAt: 27th May 2026
------------------------------------------
```