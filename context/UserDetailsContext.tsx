import { createContext } from "react";

const UserDetailsContext = createContext<any>({
    user: null,
    setUser: (user: any) => { }
})

export default UserDetailsContext