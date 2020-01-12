import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
	const [ links, setLinks ] = useState();
	const { request, loading } = useHttp();
	const { token } = useContext( AuthContext );

	const fetchedLinks = useCallback( async () => {
		try {
			const fetched = await request( '/api/link/', 'GET', null, {
				authorization: `Bearer ${ token }`
			});
			setLinks( fetched );
			
		} catch (error) {}
	}, [ token, request ]);

	useEffect( () => {
		fetchedLinks();
	}, [ fetchedLinks ]);

	if( loading ) {
		return (
			<Loader />
		)
	}
	console.log(loading)
	return (
		<div>
			{ !loading && links && <LinksList links={ links } /> }
			<h1>Links Page</h1>
		</div>
	)
};