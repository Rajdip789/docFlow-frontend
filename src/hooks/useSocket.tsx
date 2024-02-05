import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/lib/api/axios';

const useSocket = () => {
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		const s = io(BASE_URL);
		setSocket(s);
	
		return () => {
			s.disconnect()
		}
	}, []);

	return socket;
}

export default useSocket;