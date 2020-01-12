import { useState, useCallback, useEffect} from 'react';
import { useHttp } from './http.hook';

export const useAuth = () => {
    const [ token, setToken ] = useState( null );
    const [ ready, setReady ] = useState( false );
    const [ userId, setUserId ] = useState( null );
    const { request } = useHttp();

    const login = useCallback( ( jwtToken, id ) => {
        setToken( jwtToken );
        setUserId( id );

        localStorage.setItem( 'userData', JSON.stringify({
            userId: id , token: jwtToken
        }));
    }, [] );

    const logout = useCallback( () => {
        setToken( null );
        setUserId( null );
        localStorage.removeItem( 'userData' );
    }, [] );

    useEffect( () => {
        const checkAuth = async () => {
            try {
                const data = JSON.parse( localStorage.getItem( 'userData' ) );
                
                await request( '/api/link/', 'GET', null, { // Проверка на корректность серверного и клиентсккого токена
                    authorization: `Bearer ${ data && data.token }`
                });

                if ( data && data.token ) {
                    login( data.token, data.userId);
                };
                setReady( true );
            } catch (error) {
                console.log(error);
                if (error.message === '401') {
                    logout();
                    setReady( true );
                }
            }
        };
        
        checkAuth();
    }, [ login, logout, request ]) 

    return { login, logout, token, userId, ready }
};