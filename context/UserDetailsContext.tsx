import { createContext } from "react";

const UserDetailsContext = createContext({
    user: null,
    setUser: (user: any) => { }
})

export default UserDetailsContext