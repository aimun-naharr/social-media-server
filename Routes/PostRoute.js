import express from "express"
import { createPost, deletePost, getPost, getTimelinePost, likePost, updatePost } from "../Controllers/PostController.js"
const router= express.Router()

router.get('/:id', getPost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePost)
export default router