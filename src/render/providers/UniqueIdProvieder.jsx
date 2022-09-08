import React,{ useContext,useState} from 'react'
import io from'socket.io-client'

const UniqueIdContext = React.createContext()
const UniqueIdUpdateContext = React.createContext()

export const useUniqueId = (update=false) => {
    return update ?  useContext(UniqueIdUpdateContext) : useContext(UniqueIdContext)
}

const UniqueIdProvieder = (props) => {
    const socket_connection = io("http://localhost:5000")
    const [socket, setSocket] = useState(socket_connection)
    
    return (
        <UniqueIdContext.Provider value={socket}>
            <UniqueIdUpdateContext.Provider value={setSocket}>
                {props.children}
            </UniqueIdUpdateContext.Provider>
        </UniqueIdContext.Provider>
    )
}

export default UniqueIdProvieder