import { useState, useCallback } from 'react';
import { useMessage } from './message.hook';

export const useHttp = () => {
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( null );
    const message = useMessage();
    const request = useCallback(  async ( url, method = 'GET', body = null, headers = {} ) => {
        setLoading( true );
        try {
            if ( body ) {
                body = JSON.stringify( body );
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch( url, { method, body, headers } );
            console.log(response)
            const data = await response.json();

            if ( response.status === 401 ) {
                message( data.message || 'Что-то пошло не так' );
                throw new Error( `${response.status}` );
            }

            if ( !response.ok ) {
                throw new Error( data.message || 'Что-то пошло не так');
            };
            
            setLoading( false );
            return data;

        } catch (error) {
            setLoading( false );
            setError( error.message );
            throw error;
        }   
    }, [ message ]);

    const cleanError = useCallback( () => setError( null ), []);

    return { loading, request, error, cleanError }
}