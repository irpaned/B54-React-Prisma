// berfungsi untuk menentukan type data apa yang harus di isi

import joi from "joi"
import { CreateThreadDTO } from "../dto/thread-dto"

export const createThreadSchema = joi.object<CreateThreadDTO>({
    content : joi.string().min(1).max(255).required(),
    avatar : joi.string(),
    image : joi.string(),
    numberOfReplies : joi.number(),
    numberOfLike : joi.number(),
    numberOfShare : joi.number()
}) 