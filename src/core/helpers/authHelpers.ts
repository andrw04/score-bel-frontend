import { isValid } from "date-fns"
import { jwtDecode } from "jwt-decode"
import { Middleware } from "redux"

export const isValidToken = (token: string) => {
    try {
        const decoded = jwtDecode(token)

        if (!decoded.exp) {
            return false
        }

        return decoded.exp > Date.now() / 1000
    } catch (error) {
        return false
    }
}