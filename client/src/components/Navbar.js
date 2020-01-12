import React, { useContext } from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
	const history = useHistory();
	const authContext = useContext( AuthContext );

	const handlerClick = (event) => {
		event.preventDefault();
		authContext.logout();
		history.push('/');
	}

    return (
			<nav>
				<div className="nav-wrapper indigo accent-2">
					<a href="/" className="brand-logo">Создание ссылок</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><NavLink to="/create">Создать</NavLink></li>
						<li><NavLink to="/links">Ссылки</NavLink></li>
						<li><a href="/" onClick={ handlerClick }>Выйти</a></li>
					</ul>
				</div>
  		</nav>
    )
}