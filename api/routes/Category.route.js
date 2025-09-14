import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js'
import {adminAuthenticate} from '../middleware/adminAuthenticate.js'


const CategoryRoute = express.Router()

CategoryRoute.post('/add',adminAuthenticate,addCategory)
CategoryRoute.put('/update/:categoryid',adminAuthenticate,updateCategory)
CategoryRoute.get('/show/:categoryid',adminAuthenticate,showCategory)
CategoryRoute.delete('/delete/:categoryid',adminAuthenticate,deleteCategory)

CategoryRoute.get('/all-category',getAllCategory)


export default CategoryRoute