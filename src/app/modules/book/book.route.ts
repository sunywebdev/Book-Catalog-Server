import express from 'express'
import { createBook, deleteBook, getBook, getBooks, updateBook } from './book.controller'

const v1BookRoute = express.Router()

v1BookRoute.post('/', createBook)
v1BookRoute.get('/', getBooks)
v1BookRoute.get('/:id', getBook)
v1BookRoute.patch('/:id', updateBook)
v1BookRoute.delete('/:id', deleteBook)

export default v1BookRoute
