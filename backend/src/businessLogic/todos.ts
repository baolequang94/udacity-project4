import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess'
import { TodoItem, TodoUpdate } from '../models'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'

const todoAccess = new TodoAccess()

export async function getTodos(userId: string): Promise<TodoItem[]> {
  return todoAccess.getTodos(userId)
}

export async function createTodo(
  userId: string,
  newTodoData: CreateTodoRequest
): Promise<TodoItem> {
  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  const done = false
  //   const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
  const newTodo: TodoItem = {
    todoId,
    userId,
    createdAt,
    done,
    // attachmentUrl,
    ...newTodoData
  }
  return todoAccess.createTodo(newTodo)
}

export async function updateTodo(
  userId: string,
  todoId: string,
  updatedTodo: TodoUpdate
): Promise<void> {
  return todoAccess.updateTodo(userId, todoId, updatedTodo)
}

export async function deleteTodo(
  userId: string,
  todoId: string
): Promise<void> {
  return todoAccess.deleteTodo(userId, todoId)
}

// export async function generateUploadUrl(
//   userId: string,
//   todoId: string
// ): Promise<string> {
//   const bucketName = process.env.IMAGES_S3_BUCKET
//   const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION, 10)
//   const s3 = new AWS.S3({ signatureVersion: 'v4' })
//   const signedUrl = s3.getSignedUrl('putObject', {
//     Bucket: bucketName,
//     Key: todoId,
//     Expires: urlExpiration
//   })
//   await todoAccess.saveImgUrl(userId, todoId, bucketName)
//   return signedUrl
// }
