import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'

import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`)
    else {
      alert("Please provide a valid room id")
    }
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-4/12 p-2 border border-white rounded mt-8 text-white flex flex-col items-center justify-center">
        <h1 className='text-xl text-center'>Google Meet Clone</h1>
        <div className="flex flex-col items-center mt-3 w-full">
          <input
            className='text-black text-lg p-1 rounded w-9/12 mb-3 text-center'
            placeholder='Enter Room ID'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button className='bg-buttonPrimary py-2 px-4 rounded' onClick={joinRoom}>
            Join Room
          </button>
        </div>
        <span className="my-3 text-xl">--------------- OR ---------------</span>
        <button className='bg-buttonPrimary py-2 px-4 rounded' onClick={createAndJoin}>
          Create a new room
        </button>
      </div>
    </div>
  )
}
