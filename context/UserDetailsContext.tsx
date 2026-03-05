import { LogOut } from "lucide-react";
import { createContext } from "react";

const UserDetailsContext = createContext<any>({
    user: null,
    setUser: (user: any) => { },
    logout: () => { },
})

export default UserDetailsContext