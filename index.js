require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors')
const app = express();
const productRouter = require('./src/routes/product')
const categoryRouter = require('./src/routes/category')
const transactionRouter = require('./src/routes/transaction')


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());


app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/transaction', transactionRouter)


app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messageError
  })
  next()
})

const host = process.env.DB_HOST;
const port = process.env.PORT;
app.listen(8585, () => {
  console.log(`server running on http://${host}:${port}`)
})