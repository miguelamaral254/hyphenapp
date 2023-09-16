import { onAuthStateChanged, signOut } from "@firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=> {
            if(user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        });
        return unsubscribe;
    },[]);
    const logout = () => {
        signOut(auth).then(()=>{
            setUser(null);
        });
    };
    const memoedValue = useMemo(()=> {
        return {user, setUser, loading, setLoading, logout};
    },[user, loading]);
    return (
        <AuthContext.Provider>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}
export default function useAuth() {
    return useContext(AuthContext);
}