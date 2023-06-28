var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Swagger import
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// CORS and Mongoose import
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var subjectsRouter = require('./routes/subjects'); 
var threadsRouter = require('./routes/threads');
var postsRouter = require('./routes/posts');
var searchesRouter = require('./routes/searches');

var app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'API de PAW',
      description: 'Documentação da API',
      contact: {
        name: 'Suporte'
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));

// CORS for routes
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

//  MongoDB connection
//useNewUrlParser: new MongoDB driver connection string parser
//useUnifiedTopology: new MongoDB driver connection management mechanism. avoid deprecation warnings
mongoose.connect('mongodb+srv://8190370:qCSKHX2BQ9@pawtper.kgjfj9w.mongodb.net/your-database-name?retryWrites=true&w=majority', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
  .catch(error => console.error('Erro ao estabelecer conexão com o MongoDB: ', error));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter); 
app.use('/subjects', subjectsRouter);
app.use('/threads', threadsRouter);
app.use('/posts', postsRouter);
app.use('/searches', searchesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


