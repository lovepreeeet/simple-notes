import * as zod from "zod"
import { COMMON_REGEX } from "../../constants"

export const loginValidation = zod.object({
    email: zod.string(),
    password: zod.string(),
})

export const registerValidation = zod.object({
    username: zod.string(),
    password: zod.string().min(8).regex(COMMON_REGEX.STRONG_PASSWORD),
    email: zod.string().regex(COMMON_REGEX.EMAIL),
})