import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { useSocket } from '@/context/socket'
import { useRouter } from 'next/router'
import useMediaStream from './useMediaStream'

const usePlayer = (myId, roomId, peer) => {
    const socket = useSocket()
    const [players, setPlayers] = useState({})
    const router = useRouter()
    const playersCopy = cloneDeep(players)
    const { stream } = useMediaStream();

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    // Function to stop all media tracks
    const stopMediaTracks = () => {
        if (stream) {
            console.log("Stopping media tracks:", stream.getTracks());
            stream.getTracks().forEach((track) => {
                console.log(`Stopping track: ${track.kind}`);
                track.stop();
            });
        }
    };

    const leaveRoom = () => {
        stopMediaTracks();
        socket.emit('user-leave', myId, roomId)
        console.log("leaving room", roomId)
        peer?.disconnect();
        router.push('/')
    }

    const toggleAudio = () => {
        console.log("I toggled my audio")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return { ...copy }
        })
        socket.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return { ...copy }
        })
        socket.emit('user-toggle-video', myId, roomId)
    }

    return { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom }
}

export default usePlayer;