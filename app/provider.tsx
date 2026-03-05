"use client"
import React, { useContext, useEffect, useState } from 'react'
import supabase from '@/services/superbaseClinet'
import UserDetailsContext from '@/context/UserDetailsContext'

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        createNewUser()
    }, [])
    const createNewUser = async () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (user) {
                //check if user exists
                let { data: User, error } = await supabase.from('Users').select('*').eq('email', user?.email)
                if (User?.length === 0) {
                    //create new user
                    let { data, error } = await supabase.from('Users').insert([{
                        email: user?.email,
                        picture: user?.user_metadata?.avatar_url,
                        name: user?.user_metadata?.name,
                    }]).select()
                    if (data) setUser(data[0])
                    if (error) console.log(error.message)
                } else if (User) {
                    setUser(User[0])
                }

            }
        })
    }
    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error(error.message)
            return
        }

        window.location.href = "/login"
    }
    return (
        <UserDetailsContext.Provider value={{ user, setUser, logout }}>
            <div>{children}</div>
        </UserDetailsContext.Provider>
    )
}

export default Provider

export const useAuth = () => {
    return useContext(UserDetailsContext)
}
