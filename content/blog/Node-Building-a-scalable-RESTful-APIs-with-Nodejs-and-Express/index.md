---
title: Scalable RestfulAPIs with Node.js and Express
date: "2024-05-28T22:40:32.169Z"
description: Building Scalable RESTful APIs with Node.js and Express
category: "Node.js"
tags: ["Node.js", "restAPI", "scalability"]
heroImage: "./node-js-scalable-rest-api.webp"
---
A REST API is an application programming interface (API) that follows the design principles of the REST architectural style.
REST is based on a set of architectural constraints that leverage existing network protocols. REST is short for representational state transfer,
and is a set of rules and guidelines about how you should build a web API.

#### 1. Intro

#### 1.1. What is REST API

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

*
  - **GET** */agents* : List all AI agents.
*
  - **POST** */agents* : Create a new AI agent.
*
  - **GET** */agents/:id* : Retrieve details about a specific agent.
*
  - **PUT** */agents/:id*  : Update an agent’s attributes (e.g., status, current task).
*
  - **DELETE** */agents/:id*  : Remove an agent.
*
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

*
  - Logging requests
*
  - Parsing request bodies (e.g., JSON or URL-encoded data)
*
  - Handling authentication and authorization
*
  - Managing sessions or cookies
*
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

- **URI Versioning** Include the version in the URL, such as _/v1/agents_ or _/api/v1/agents_
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
app.use(express.json());

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

const agentsRouter = require('./routes/agents');
//it is common to prefix it with "api" to have a clear separation of concerns
app.use('/api', agentsRouter);
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

#### 3.2.2 Error Handling Middleware

Error handling middleware in Express provides a centralized way to catch and process errors that occur during the request-response cycle. Instead of having error-handling code scattered throughout your route handlers, you can define a single middleware function that deals with errors uniformly. This not only simplifies your code but also makes it easier to maintain and update.
Benefits of Centralized Error Handling:

- **Consistency**: All errors are processed in one place, ensuring that your API returns consistent responses for errors.
- **Simplified Debugging**:Central logging of error details (like stack traces) makes it easier to diagnose issues.
- **Separation of Concerns**: Keeps your route handlers focused on their main logic without cluttering them with repetitive error-handling code.

Implementation:

```js 
// In your index.js 
//place your error middleware last, so it doesn't interfere with other middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Send a generic error response
  res.status(500).json({ error: 'Something went wrong!' });
});
```

How It Works:

1. When an error occurs in any of your route handlers or middleware, you call next(err) with the error object.
2. Express will skip any remaining non-error-handling middleware and pass the error to your error-handling middleware.
3. The error-handling middleware logs the error and sends a standardized HTTP response (in this case, a 500 Internal Server Error).

By centralizing error handling, you ensure that every error is managed uniformly and that your API responses remain consistent—even in the face of unexpected issues.

#### 3.2.3 Security Middleware with Helmet

Security is a crucial aspect of any web application. One of the simplest and most effective ways to secure your Express app is by using Helmet—a collection of middleware functions that help secure HTTP headers. Helmet helps protect your app from well-known web vulnerabilities by setting various HTTP headers appropriately.
How Helmet Enhances Security:
Helmet sets multiple HTTP headers to improve security, including:

- **X-DNS-Prefetch**-Control: Controls browser DNS prefetching.
- **Strict-Transport-Security**: Enforces secure (HTTPS) connections to the server.
- **X-Frame-Options**: Protects against click-jacking by controlling whether your content can be displayed in a frame.
- **X-Content-Type**-Options: Prevents browsers from MIME-sniffing a response away from the declared content-type.
- **X-XSS-Protection**: Enables the browser’s built-in cross-site scripting filters.

By automatically setting these headers, Helmet provides a layer of protection against common attacks, such as cross-site scripting (XSS) and clickjacking, without much configuration on your part.
Integrating Helmet:

```js
//index.js
const helmet = require('helmet');
app.use(helmet());
```

Helmet should be placed early in your middleware stack to ensure that every response has secure HTTP headers applied.
For now, we'll focus on Helmet as our primary security middleware, and we’ll dive deeper into these additional practices(input validation, authentication, rate limiting etc.) in upcoming chapters.
Now that we have managed to understand and install the main middlewares you should end up with an index.js like this:

Flow Summary   
In our Express application, middleware is executed sequentially, and the order in which you apply them is crucial:

- **Logging Middleware (Morgan)**: Morgan is placed first to ensure every incoming HTTP request is logged. This logging provides valuable insights during development and debugging, as it captures details like the request method, URL, status code, and response time.
- **Security Middleware (Helmet)**:Next, Helmet is applied early in the middleware stack. This middleware automatically sets various HTTP headers that help protect your application from common vulnerabilities such as cross-site scripting (XSS) and clickjacking.
- **Routes and Application Logic**:With logging and security in place, your application's routes (e.g., those handling AI agents) are mounted. This means that by the time a request reaches your route handlers, it’s already logged and secured.
- **Error Handling Middleware**:Finally, the error-handling middleware is added at the end of the middleware chain. This ensures that if any part of the request-response cycle encounters an error, it will be caught and handled in a centralized manner—providing consistent error responses and logging error details for debugging.

By following this flow, your application ensures that each request is properly logged, secured, and that any errors are managed uniformly. The final integrated index.js snippet below demonstrates how these middleware components work together to create a robust Express application.

```js
const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan');
const agentsRouter = require('./routes/agents');
const helmet = require('helmet');


app.use(morgan('combined'));
app.use(helmet());
app.use('/api', agentsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to AI agents app')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

#### 4. Scalability Tips

As the name of this article suggest, we should focus on scalability a node.js/express.js app. In this section we will discuss caching strategies, load balancing and other performance optimization

#### 4.1 Caching Strategies

Caching is a powerful technique to improve the performance and scalability of your RESTful APIs. At its core, caching involves storing the results of expensive operations—like frequent database queries—in a temporary storage area (the cache) so that subsequent requests can be served quickly without hitting the database every time.

#### 4.1.1 **Caching advantages**

- **Reduced Database Load**:By keeping frequently requested data in memory, caching significantly decreases the number of direct database calls. This not only speeds up response times but also reduces the strain on your database server, allowing it to handle more complex queries or scale better under high load.
- **Improved Response Times**:Accessing data from memory is much faster than fetching it from disk or executing a database query. This can be critical for high-traffic applications where every millisecond counts in delivering a smooth user experience.
- **Cost Efficiency**:Reducing database interactions can help lower your operational costs, especially when using cloud-based databases that charge based on the number of read/write operations.

#### 4.1.2 **Types of Caching Strategies**

1. **In-Memory Caching**: This type of caching stores data in the server's memory, allowing for rapid access. Common tools for in-memory caching in Node.js include Redis and Node-Cache.

* Use Case: Ideal for caching small amounts of data that need to be accessed frequently.
* Example: Storing user session data or frequently accessed configuration settings.

2. **HTTP Caching**: This involves caching responses on the client-side or intermediate proxies, reducing the need to repeatedly fetch the same data from the server.

* Use Case: Suitable for static assets like images, stylesheets, and scripts.
* Example: Setting HTTP headers such as Cache-Control and ETag to manage client-side caching.

3. **Database Caching**: This strategy involves caching database query results, reducing the need to repeatedly execute the same queries.

* Use Case: Useful for read-heavy applications with frequent database queries.
* Example: Using a tool like Redis to cache the results of complex database queries.

4. **Application-Level Caching**: This approach caches the output of specific functions or API calls within the application.

* Use Case: Effective for caching expensive computations or third-party API responses.
* Example: Caching the results of a weather API call that doesn't change frequently.

#### 4.1.3 Example: In memory caching with **Redis**   (will update the current ai-agents project)

!!check commit (# caching with Redis)

1. install redis ```npm install redis```
2. run "redis db" for simplicity I will run it in a docker container

```bash
docker run --name my-redis -p 6379:6379 -d redis
```

3. set up a redis client module

```js
const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
```

4. create a cache middleware

```js
//caching-middleware/caching.js
const redisClient = require('../redisClient');

async function cache(req, res, next) {
  const { id } = req.params; // Adjust based on your route parameters
  try {
    const cachedData = await redisClient.get(`data:${id}`);
    console.log(`Cache hit for agent ${id}`);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (err) {
    console.error(err);
    next();
  }
}

module.exports = cache;

```

5. Cache Data: Cache the data after processing the request if it is not already cached.

```js
router.get('/agents/:id', cache, async (req, res, next) => {
  const { id } = req.params;
  const dataFromDB = { id, name: 'Example Data' };

  // Store the result in Redis with a TTL (time to live) of 3600 seconds
  //each time a request is made to this route the middleware check if the data is cached and if so
  //will return it, if not will make the db call
  await redisClient.setEx(`data:${id}`, 3600, JSON.stringify(dataFromDB));

  res.json(dataFromDB);
});
```

#### 4.1.4 **Best Practices for Caching**

* **Cache Invalidation**: Ensure that stale or outdated data is invalidated and removed from the cache to maintain data consistency. This might include time-to-live (TTL) settings or event-driven updates to clear or refresh cache entries when the underlying data changes.
* **Cache Granularity**: Cache data at the appropriate level of granularity. Too fine-grained caching can lead to overhead, while too coarse-grained caching may reduce cache effectiveness.
* **Monitoring and Metrics**: Implement monitoring and logging to track cache hits, misses, and performance metrics, allowing for continuous optimization. Tools like Redis' built-in monitoring features can help you understand how effectively your caching strategy is reducing the load on your database.

#### 4.1.5 **Caching Conclusion**

By integrating caching strategies into your Node.js and Express applications, you can significantly enhance the scalability and responsiveness of your APIs. This approach not only optimizes resource usage but also provides a smoother experience for your users.

#### 4.2 Load balancing

Load balancing is a critical technique for scaling Node.js and Express applications, ensuring that incoming requests are distributed across multiple servers. This not only improves performance but also enhances fault tolerance.

#### 4.2.1 How Load Balancing Distributes Incoming Requests

Load balancers sit between clients and servers, distributing incoming requests across multiple server instances. This helps prevent any single server from becoming overloaded, ensuring smooth and efficient handling of traffic.

#### 4.2.2 Types of Load Balancers:

* **Reverse Proxies**: Reverse proxies like NGINX or Apache HTTP Server forward client requests to one or more backend servers. They can handle SSL termination, caching, and load balancing.In addition to load balancing, reverse proxies provide a security layer by hiding the details of backend servers from external clients, reducing the overall attack surface.
* **External Load Balancers**: Cloud providers like AWS, Google Cloud, and Azure offer managed load balancing services. These external load balancers can distribute traffic across multiple instances, manage fail-overs, and integrate with other cloud services.
* **Distribution Algorithms**:

1. Round Robin: Distributes requests in a sequential, cyclic manner.
1. Least Connections: Directs traffic to the server with the fewest active connections.
1. IP Hash: Uses the client’s IP address to consistently assign requests to the same server, which can be useful for session persistence.

#### 4.2.3 Leveraging Node.js Clustering for Multi-Core Systems

Node.js applications are single-threaded by nature, meaning they can only use one CPU core. Clustering allows you to take advantage of multi-core systems by creating multiple Node.js processes, each running on a separate core.

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Worker processes have an HTTP server.
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello world\n');
  }).listen(8000);
}

```

#### 4.2.3 Popular Load Balancers

* **HAProxy**: Another widely used load balancer known for its reliability and performance, often used in high-availability setups.
* **NGINX**: A high-performance load balancer that can handle millions of concurrent connections. Ideal for reverse proxy and web server functionality.   
  Example Load Balancer Configuration with NGINX:

```nginx
http {
  upstream myapp {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://myapp;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
}

```

#### 4.2.4 Health Checks and Failover

Load balancers perform health checks to monitor the status of servers. If a server fails, the load balancer reroutes traffic to healthy servers, ensuring continuous availability.

#### 4.2.5 Autoscaling

Combining load balancing with autoscaling allows your application to dynamically adjust the number of running instances based on traffic load. This ensures optimal resource utilization and cost efficiency.

#### 4.2.6 Load balancing Conclusion

Implementing load balancing is essential for scaling your Node.js/Expressapplications. By distributing incoming requests, leveraging multi-core systems with Node.jsclustering, and ensuring high availability with health checks and autoscaling, you can create a robust and scalable application architecture.

#### 4.3 Performance Optimization

Efficient performance is essential for building scalable Node.js applications. Beyond caching and load balancing, optimizing your application’s performance involves writing non-blocking, asynchronous code and managing processes effectively. In this section, we'll briefly cover the importance of asynchronous programming and introduce process management tools like PM2.

#### 4.3.1 Asynchronous Programming in NOde.s/Express.js

As we discussed at the beginning of this article Node.js is designed around an event-driven, non-blocking architecture. This design allows your application to handle multiple operations concurrently without waiting for tasks like file I/O or network requests to finish.   
**Benefits of Asynchronous Programming**:

* **Non-Blocking I/O**: Asynchronous operations prevent the application from being held up by time-consuming tasks like database queries, file I/O, and network requests.
* **Improved Responsiveness:** By handling tasks asynchronously, the application can remain responsive even under heavy load, providing a smoother user experience.
* **Efficient Resource Utilization**: Asynchronous programming enables better utilization of system resources, allowing the application to handle more concurrent requests.   
  As you can see in the previous code snippet, the get agent by _id_ contains an async/await code block (4.1.3 (4)) which will basically instruct that this code to be asynchronous processed, which means that it won't block the main thread, will be deferred to a child process which will notify the main tread o f it's completion through a callback.

#### 4.3.1 Process Management with PM2

PM2 is a powerful process manager for Node.js applications that offers features like process management, load balancing through clustering, monitoring, and zero-downtime reloads. PM2 helps you manage and scale your applications efficiently, ensuring they run smoothly in production environments.
Benefits of Using PM2:

* **Process Management**: Start, stop, restart, and monitor multiple Node.js processes with ease.
* **Clustering**: Utilize multiple CPU cores by running multiple instances of your application, improving performance and fault tolerance.
* **Monitoring and Logging**: Track metrics such as CPU and memory usage, and view logs for debugging and performance analysis.
  basic example of using PM2 module

```bash
npm install -g pm2
pm2 start app.js
pm2 start app.js -i max  
pm2 monit  
pm2 logs
```

While this section provides an overview of performance optimization techniques such as asynchronous programming and process management with PM2, a deeper dive into these topics will be covered in future articles. We will explore advanced concepts, best practices, and real-world examples to help you master performance optimization in your Node.js applications.

#### 4.4 Testing the endpoints for _Ai agents_ app

Run ```node index.js``` in the root folder of the app.
Testing can be done in multiple ways, running the server and open a browser or using _curl_ in the console. I will be using _curl_.
This will be my dummy agents' data:

```js
//data.js
const agents = [
  {
    id: 1,
    name: 'ChatBot Alpha',
    capabilities: ['Natural Language Processing', 'Sentiment Analysis'],
    status: 'Active',
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 2,
    name: 'VisionBot Beta',
    capabilities: ['Image Recognition', 'Object Detection'],
    status: 'Inactive',
    createdAt: '2025-01-20T10:30:00Z',
  },
  {
    id: 3,
    name: 'VoiceBot Gamma',
    capabilities: ['Speech Recognition', 'Voice Synthesis'],
    status: 'Active',
    createdAt: '2025-02-05T14:45:00Z',
  },
  {
    id: 4,
    name: 'DataBot Delta',
    capabilities: ['Data Analysis', 'Predictive Analytics'],
    status: 'Maintenance',
    createdAt: '2025-02-10T09:15:00Z',
  }]
module.exports = agents;
```

I will add here the list of curl commands with explanation for each of it:

```bash
//get all agents
curl -X GET http://localhost:3000/api/agents
//post a new agent
curl -X POST http://localhost:3000/api/agents -H "Content-Type: application/json" -d '{"id": 5, "name": "ChatBot Alpha Beta", "capabilities": ["Natural Language Processing"], "status": "Active", "createdAt": "2025-02-15T08:00:00Z"}'
//get an agent  by id (id===1)
curl -X GET http://localhost:3000/api/agents/1
// update an agent by id(id===4)
curl -X PUT http://localhost:3000/api/agents/4 -H "Content-Type: application/json" -d '{"name": "ChatBot Alpha", "capabilities": ["Natural Language Processing", "Sentiment Analysis"], "status": "Active", "createdAt": "2025-01-15T08:00:00Z"}'
//delete an agen by id(id===2)
curl -X DELETE http://localhost:3000/api/agents/1
//instruct an agent to perform a task
curl -X POST http://localhost:3000/api/agents/1/execute -H "Content-Type: application/json" -d '{"task": "Execute Task"}'
```

1. retrieving the list of agents(get all agents):

```js
//route handler in the agents.js
router.get('/agents', (req, res, next) => {
  res.json(agents);
});
```

you will retrieve the list of agents.

2. create a new agent (post a new agent)

```js
router.post('/agents', (req, res, next) => {
  const newAgent = req.body;
  console.log('New Agent:', newAgent);
  agents.push(newAgent)
  res.status(201).json(newAgent);
});
```

3. get an agent by id:

```js
router.get('/agents/:id', cache, async (req, res, next) => {
  const { id } = req.params;
  const agent = agents.find(agent => agent.id === +id);
  console.log('agent ', agent)
  // Store the result in Redis with a TTL (time to live) of 3600 seconds
  await redisClient.setEx(`data:${id}`, 3600, JSON.stringify(agent));

  res.json(agent);
});
```

In this method as you can see we have redis db for caching so if you try to retrieve the second time the same agent(in no more than 1h) you will
get the response from the cached response. Check the console where you haev run the project, first time you will se the console.log for the
agent and if you run the same command you will see the console from caching :

```js
 console.log(`Cache hit for agent ${id}`);
 ```

4. update an agent
   In this method we identify the agent that needs to be updated and then we replace it in that list of agent with the new one

```js
router.put('/agents/:id', (req, res, next) => {
  const { id } = req.params;
  const updatedAgent = req.body;
  const index = agents.findIndex(agent => agent.id === +id);

  if (index !== -1) {
    agents.splice(index, 1, { ...agents[index], ...updatedAgent });
    res.status(200).json({ message: `Agent ${id} updated`, agent: agents[index] });
  } else {
    res.status(404).json({ message: `Agent ${id} not found` });
  }
});
```

5. delete an agent by id (id===2)

```js
router.delete('/agents/:id', (req, res, next) => {
  const { id } = req.params;
  const index = agents.findIndex(agent => agent.id === +id);
  if (index !== -1) {
    agents.splice(index, 1);
    res.status(200).json({ message: `Agent ${id} deleted`, agents });
  } else {
    res.status(404).json({ message: `Agent ${id} not found` });
  }
});
```

You will retrieve the list of agents without the deleted one

6. Executing a task (you will receive the message "Agent ${id} is executing a task")

```js
router.post('/agents/:id/execute', (req, res, next) => {
  const { id } = req.params;
  res.send(`Agent ${id} is executing a task`);
});
```

#### 5 Conclusion

In this article, we explored several key strategies to build scalable Node.js REST APIs. By implementing caching, we significantly reduced database load and improved response times, while load balancing and Node.js clustering allowed us to distribute incoming requests efficiently and utilize multi-core systems. We also touched on performance optimization through asynchronous programming and set the stage for deeper dives into process management tools like PM2 in future articles.

https://github.com/florin1000/ai-agents

#### Reference

- [Dr Roy Fleming - Architectural Styles and the Design of Network-based Software Architectures, chapter 5](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [Node.js - I/O model](https://nodejs.org/en/about)
- [Express.js - I/O model](https://expressjs.com/)
- [Express.js - Routing](https://expressjs.com/en/guide/routing.html)
- [Express.js - Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [API Caching: Techniques for Better Performance](https://pieces.medium.com/api-caching-techniques-for-better-performance-6297ec1ac02c)
- [IBM - What is REST](https://www.ibm.com/think/topics/rest-apis#:~:text=A%20REST%20API%20(also%20called,transfer%20(REST)%20architectural%20style)
- [PM2](https://pm2.keymetrics.io/)

Scalable RestfulAPIs with Node.js and Express(caching, load-balancing, clustering, PM@, Asynchronous,I/O))
