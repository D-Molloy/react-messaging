import React, { useContext, createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}



export function SocketProvider({ id, children }) {

  const [socket, setSocket] = useState()

  // create a new socket when we initially load the page of when the id changes
  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } })
    setSocket(newSocket)

    // close the old socket
    return () => newSocket.close()
  }, [id])


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
