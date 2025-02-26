---
title: Scalable RestfulAPIs with Node.js and Express
date: "2024-05-28T22:40:32.169Z"
description: Building Scalable RESTful APIs with Node.js and Express
category: "Node.js"
tags: "Node.js, restAPI, scalability"
---

#### 1. Intro

#### 1.1. What is REST API

A REST API is an application programming interface (API) that follows the design principles of the REST architectural style.
REST is based on a set of architectural constraints that leverage existing network protocols. REST is short for representational state transfer,
and is a set of rules and guidelines about how you should build a web API.

REST principles are:

- **Stateless**: each API request should contain all the information needed to process the request since the server has no state in this regard
- **Client-server architecture**: both the server and the client are decoupled and can pivot independently; between them many layers may interfere
- **Uniform communications** :  you have to comply to standard HTTP methods (GET, POST, PUT, DELETE)
- **Resources** : everything is treated as a resource. Ex: _/user/123_ it might be a user with id _123_
- **Standard format** : resources can be represented in various formats like **JSON**, **XML** or **HTML** nad the type can be specified in header

Importance in modern web development:

- **Flexibility and Granularity** A clear separation of concerns allows multiple teams to work on different aspects of the same project concurrently can allow multiple teams working at the same time at the same project
- **Interoperability** the same resources can be consumed by a lot of clients like web-browsers, mobile apps, servers
- **Scalability** Because REST APIs are stateless, they can efficiently handle a large number of concurrent requests and easily scale up or down.

#### 1.2. Node.js and Non-Blocking I/O

Node.js is an asynchronous, event-driven JavaScript runtime built on Chrome's V8 engine, designed specifically for building **scalable**
applications. In this context, **scalability** is closely related to the Node.js event loop and its I/O model. In Node.js, most I/O
operations are non-blocking—operations are deferred to background processes (or "child processes"), and when these operations complete,
callbacks notify the main thread. This means the main thread remains free to handle additional requests concurrently, enabling the
application to support numerous simultaneous connections. As a result, Node.js is ideal for live-streaming, online gaming, real-time
apps, microservices, and more, while also being energy-efficient compared to managing multiple threads.

#### 1.3. Express.js

Express.js provides a minimalist framework that simplifies the process of building web applications and APIs.
Its straightforward and easy-to-understand syntax makes it accessible to developers of all skill levels.
Express.js gets packed with features like middleware architecture, powerful routing, easy to implement a variety of modules,
lightweight, flexibility (pattern wise),widely adopted, and benefits from strong community support

#### 1.4. Project

In this article, I'll build an API to manage digital agents using Node.js and Express.
Through this project, you'll learn how to design a scalable RESTful API, set up endpoints,
integrate middleware, and apply best practices for scalability.

- **GET** */agents* : List all AI agents.
- **POST** */agents* : Create a new AI agent.
- **GET** */agents/:id* : Retrieve details about a specific agent.
- **PUT** */agents/:id*  : Update an agent’s attributes (e.g., status, current task).
- **DELETE** */agents/:id*  : Remove an agent.
- **POST** */agents/:id/execute*  : Instruct an agent to perform a task, simulating an AI action.

**What you'll learn:**

- How to set up a Node.js project with Express.
- Designing RESTful endpoints for CRUD operations.
- Integrating middleware for logging, error handling, and security.
- Scalability tips to handle numerous concurrent requests.

#### 2. Key Concepts

#### 2.1. Express Basics

As mentioned on the [official website](https://expressjs.com/) "Express is a minimal and flexible Node.js web application framework that provides
a robust set of features for web and mobile applications." Minimal and flexible means that Express, when installed comes packed with
base core functionality and the user has to add the extra modules as required by the specific of the project. So, in order to handle
logging, headers,session, cookies, authentication etc., you have to installed them extra.

Express greatly simplifies working with HTTP in Node.js by abstracting away many of the low-level details you’d otherwise have to manage with the native http module. Rather than manually parsing request URLs, handling query strings, or setting response headers, Express provides a clean, intuitive API that lets you focus on your application’s logic.
Key Advantages:

**Simplified Routing**   
Express offers methods like app.get(), app.post(), app.put(), and app.delete(), allowing you to define routes in a straightforward manner. This eliminates the need for tedious URL parsing and manual method checks, making your code more readable and maintainable.

**Built-In Middleware Support**  
The middleware architecture in Express lets you easily plug in functions to handle common tasks—such as parsing JSON or URL-encoded bodies, managing cookies and sessions, or logging requests—without having to build these features from scratch. This modularity means you can tailor your stack to your project's needs while keeping the core server lean.

**Enhanced Readability and Maintainability**  
By providing a structured way to define how requests are handled, Express encourages clean separation of concerns. Your routing logic, middleware, and error handling can all be organized neatly, which makes the code easier to understand and maintain.

**Rich Ecosystem**   
Thanks to its widespread adoption, Express has a vast ecosystem of plugins and middleware available. Whether you need to implement authentication, logging, or any other common web functionality, chances are there’s already a well-supported solution you can integrate with minimal effort.

Each of the above Express perk will be described in depth in the following paragraph.

#### 2.2. Express (basic) routing

Routing in Express refers to how an application’s endpoints (or routes) respond to client requests.
Each route is associated with an HTTP method and a specific URL pattern. Express makes it easy to define routes using methods like app.get(), app.post(), app.put(), and app.delete().

For example, consider a simple route for retrieving digital agents:

```js
app.get("/agents", (req, res) => {
  // Logic to retrieve and return a list of agents
  res.send("List of agents")
})

/**
 * in this snnipet, a GET request to /agents triggers the callback function, which sends back a list of agents.
 * This abstraction hides the underlying complexity of URL parsing and method handling that you’d otherwise manage
 * with Node’s native HTTP module.
 * */
```

#### 2.3. Middleware (basic)

Middleware functions in Express are at the heart of request processing. They have access to the request object (req), the response object (res), and the next middleware function in the chain (next). Middleware can perform tasks such as:

- Logging requests
- Parsing request bodies (e.g., JSON or URL-encoded data)
- Handling authentication and authorization
- Managing sessions or cookies
- Error handling

```js
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

```

#### 2.4 Request-Response cycle

The Request-Response Cycle

The request-response cycle in an Express application follows these steps:

**Request Received**  
The Node.js HTTP module accepts an incoming HTTP request and passes it to the Express application.

**Middleware Processing**   
Express processes the request through a chain of middleware functions. Each middleware function can modify the request, perform validations, or execute logging tasks before passing control onward.

**Routing**  
After all applicable middleware have run, Express matches the request to a route based on the HTTP method and URL. The corresponding route handler is then executed.

**Route Handler Execution**   
The route handler contains the application logic—retrieving data, processing input, and preparing a response.

**Response Sent**   
Finally, Express sends the HTTP response back to the client.

This architecture ensures that requests are handled in a modular, organized manner, allowing for clear separation of concerns and easier maintenance.

#### 2.5. State in API REST

As I mentioned above, a cornerstone of REST is that each API request is stateless. This means:

1. Self-Contained Requests   
   Every request from the client must include all the information the server needs to understand and process it. The server does not store any context between requests. For example, if a client wants to update an agent, the request must contain all the necessary data and authentication details.
2. Benefits of Statelessness

- **Scalability**   Since the server doesn't need to retain session state, it's easier to scale horizontally—each request can be handled by any available server instance.
- **Reliability**   Stateless systems are simpler to design and troubleshoot because there’s no hidden context that could lead to inconsistent behavior.
- **Caching**   Since each request is self-contained, responses can be more easily cached, improving performance.

#### 2.6. Versioning

As your API evolves, changes might break compatibility with older client applications. To introduce new features or improvements without disrupting existing clients. Having a robust versioning system allows for a gradual transition where clients can upgrade at their own pace.
Common version strategies:

- **URIVersioning** Include the version in the URL, such as _/v1/agents_ or _/api/v1/agents_
- **Header Versioning** Specify the API version in a custom HTTP header (e.g., _Accept: application/vnd.myapi.v1+json_).
- **Query Parameters** Pass the version as a parameter in the query string, e.g., _/agents?version=1_.

Having a version system in place allows older clients to rely on the old version and keep up their systems and allows you
to easily introduce new features without forcing all the clients to upgrade immediately.

#### 3. Project Setup

#### 3.1 Handling Endpoints   

As mentioned earlier, in this article, we'll build an API to manage digital agents using Node.js and Express. We'll start by initializing a new Node/Express project and installing the necessary modules to showcase the advantages of the Express.js framework.

Steps:

1. Prerequisites: Ensure you have [Node.js](https://nodejs.org/en) installed (which includes NPM). If you don't, follow the [NPM installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Init the project: Open your terminal, navigate to your desired folder, and run: ```npm init``` and follow the instructions in terminal(choose your desired entry point, I will stick to ```index.js```)
3. install Express.js : run ```npm install express``` in the same folder you initiate the project at step 2
4. extra packages : ```npm install --save-dev nodemon``` and ```npm install --save morgan helmet```, _nodemon_ for automatic server restarts(so development purposes),
   _morgan_ for logging http requests and _helmet_ for setting secure HTTP headers.
5. optional packages: ```npm install typescrypt``` to have the ability to add types for the project

You should probably should have this project file structure.
Other folders/files will be added as I progress with the project.(routes/controllers, etc.)

```markdown
-package.json
-index.js
```

and add this code to your entry file (```index.js``` in my case).

```js
const express = require('express');
const app = express()
const port = 3000
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Welcome to AI agents app')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

In the code above, we import Express, create an application instance, and define a simple GET route for the homepage that returns "Welcome to AI agents app." Finally, we start the server on port 3000. If you open a web browser and navigate to http://localhost:3000, you should see the welcome message

#### 4. Designing Endpoints

As mentioned above we'll try to cover the main http methods that you will be going to use most of the time.
These are the routes that the express.js server will serve:

- **GET** */agents* : List all AI agents.
- **POST** */agents* : Create a new AI agent.
- **GET** */agents/:id* : Retrieve details about a specific agent.
- **PUT** */agents/:id*  : Update an agent’s attributes (e.g., status, current task).
- **DELETE** */agents/:id*  : Remove an agent.
- **POST** */agents/:id/execute*  : Instruct an agent to perform a task, simulating an AI action.

At the root of your project create a folder ```routes``` and inside the ```agents.js``` file where we will store the handlers for each route method.
You should end up with a file like this:
```js
// /routes/agents.js
const express = require('express');
const router = express.Router();

// GET /agents - List all AI agents
router.get('/agents', (req, res, next) => {
  // Logic to retrieve all agents
  res.send('List of all AI agents');
});

// POST /agents - Create a new AI agent
router.post('/agents', (req, res, next) => {
  // Logic to create a new agent
  res.send('New AI agent created');
});

// GET /agents/:id - Retrieve details about a specific agent
router.get('/agents/:id', (req, res, next) => {
  const { id } = req.params;
  // Logic to retrieve agent details by id
  res.send(`Details of agent ${id}`);
});

// PUT /agents/:id - Update an agent's attributes
router.put('/agents/:id', (req, res, next) => {
  const { id } = req.params;
  // Logic to update the agent's details
  res.send(`Agent ${id} updated`);
});

// DELETE /agents/:id - Remove an agent
router.delete('/agents/:id', (req, res, next) => {
  const { id } = req.params;
  // Logic to remove the agent
  res.send(`Agent ${id} deleted`);
});

// POST /agents/:id/execute - Instruct an agent to perform a task
router.post('/agents/:id/execute', (req, res, next) => {
  const { id } = req.params;
  // Logic to execute a task for the agent
  res.send(`Agent ${id} is executing a task`);
});

module.exports = router;
// and import this into the main index.js
//index.js
...

const agentsRouter = require('./routes/agents');
app.use('/api', agentsRouter) //it is common to prefix it with "api" to have a clear separation of concerns
...

```

An agent will be defined as an object with these keys:
```json
{
  "id": "a1b2c3",  
  "name": "Agent Smith",
  "status": "idle",
  "currentTask": null
}

```
If you run ```node index.js``` and visit the http://localhost:3000, you should see the same message("Welcome to AI agents app").

#### 3.2 Middleware Integration
From the official docs "Middleware functions are functions that have access to the request object (req), the response object
(res), and the next function in the application’s request-response cycle.
The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current 
middleware."
##### 3.2.1 Logging Middleware with Morgan

Morgan is a popular middleware for logging HTTP requests in Express. It helps you log details such as the request method, URL, status code, and response time. This is especially useful during development and debugging.
We already installed Morgan. Now let's integrate it into our application.
```js
//index.js
const morgan = require('morgan'); // Import Morgan

// Use morgan middleware to log all HTTP requests in the 'combined' format
// other formats available 'dev' & 'short' 
app.use(morgan('combined'));
```
With this setup, every HTTP request to your server will be logged in the 'combined' format.

Note on Middleware Order:
In Express, middleware is executed in the order it's added. If a route handler sends a response, any middleware added after that handler will not be executed. Consider the following examples:

In your index.js:
```js
//correct order to execute morgan -> navigate to /api/agents

app.use(morgan('combined'));

app.use('/api', agentsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to AI agents app')
})

//morgan middleware unreachable -> navigate to /api/agents
//in this case the api/router -> will trigger route handler GET agents and will run 
// "res.send" which will kill all the middlewars that may be added after it

app.use('/api', agentsRouter);

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Welcome to AI agents app')
})
```
By understanding and controlling the order in which middleware is applied, you can ensure that all desired functionalities (like logging) are executed as expected.


#### Optional Typescript
https://github.com/florin1000/ai-agents
#### Reference

- [IBM - What is REST](https://www.ibm.com/think/topics/rest-apis#:~:text=A%20REST%20API%20(also%20called,transfer%20(REST)%20architectural%20style.)
- [Dr Roy Fleming - Architectural Styles and the Design of Network-based Software Architectures, chapter 5](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [Node.js - I/O model](https://nodejs.org/en/about)
- [Express.js - I/O model](https://expressjs.com/)
- [Express.js - Routing](https://expressjs.com/en/guide/routing.html)
- [Express.js - Middleware](https://expressjs.com/en/guide/using-middleware.html)
