'use server'

export const signIn = async({
    email,
    password
}:{
    email: string,
    password: string
}) =>{
    try{
        console.log('sign in', email, password)
    }
    catch(error){
        console.log(error)
    }
}

export const signUp = async({
   value
}:{
    value: any
}) =>{
    try{
        console.log('sign up', value)
    }
    catch(error){
        console.log(error)
    }
}