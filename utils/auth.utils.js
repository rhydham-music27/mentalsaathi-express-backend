import bcrypt from 'bcrypt'
export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}
export const comparePassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword)
    return match
}