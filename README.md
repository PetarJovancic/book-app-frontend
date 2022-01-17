## Frontend

<img src="https://img.icons8.com/officel/16/000000/react.png" 
     height="50px"
/></span>
&nbsp;&nbsp;&nbsp;
<img src="https://img.icons8.com/color/48/000000/javascript--v1.png"
/>&nbsp;&nbsp;&nbsp;
<img src="https://img.icons8.com/fluency/48/000000/docker.png"/></span>
&nbsp;&nbsp;&nbsp;

### Introduction

This is a frontend app for book web application

## Usage

The app requires an `.env` file with the following variables:

```
REACT_APP_URL=<react-app-url>
```

### Requirements

NodeJS installed on your system (14 or higher) -\*\* [NodeJS](https://nodejs.org)

### Usage

Install node_modules:

````

npm install

```

To execute app, run:

```

npm start

```

### Using Docker

To build Docker container use the following command:

```

docker build -t book-app-frontend .

```

To run Docker container use the following command:

```

docker run -p 3000:3000 book-app-frontend

```
````
