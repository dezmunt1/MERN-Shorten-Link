const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = Router();

//Register
router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Пароль введен некорректно').isLength( {min: 6} )
	]
	,
	async ( req, res ) => {
		try {
			const errors = validationResult(req);

			if( !errors.isEmpty() ) {
				return res.status( 400 ).json( { error: errors.array(), message: 'Ошибка при регистрации'});
			}

			const { email, password } = req.body;

			const candidate = await User.findOne( {email} );

			if( candidate ) {
				return res.status( 400 ).json( {message: `Пользователь ${ email } уже существует`});
			};

			const hashedPassword = await bcrypt.hash( password, 12);
			const newUser = new User( { email, password: hashedPassword } );
			await newUser.save();

			res.status( 201 ).json( { message: 'Пользователь создан' } ); 

		} catch (error) {
			res.status( 500 ).json( { message: 'Что-то пошло не так: ' + error.message } );
		}
});

//Login
router.post(
	'/login',
	[
		check( 'email', 'Введите корректный email').normalizeEmail().isEmail(),
		check( 'password', 'Введите пароль').exists()
	],
	async ( req, res ) => {
	try {
		const errors = validationResult(req);

		if( !errors.isEmpty() ) {
			return res.status( 400 ).json( { errors: errors.array(), message: 'Ошибка при входе в систему'});
		}

		const { email, password } = req.body;

		const loginUser = await User.findOne( { email } );

		if ( !loginUser ) {
			return res.status( 400 ).json( { message: "Пользователь в системе не найден" } );
		}

		const isMatch = await bcrypt.compare( password, loginUser.password );
		if ( !isMatch ) {
			return res.status( 400 ).json( { message: "Введен неверный пароль, попробуйте снова" } );
		};

		const token = jwt.sign(
			{ id: loginUser.id },
			config.get( 'jwtSecret' ),
			{ expiresIn: '1h'}
		);

		res.json( { token, userId: loginUser.id } );

	} catch (error) {
		res.status( 500 ).json( { message: 'Что-то пошло не так: ' + error.message } );
	}
});

module.exports = router;