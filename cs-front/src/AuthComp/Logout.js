import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
import { useHistory } from 'react-router-dom';

const Logout = () => {
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('logout/blacklist', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
	});
	return <div>Logout</div>;
}

export default Logout


//here we are just putting the access token in blacklist token and removing all the 
//access and refresh token from the localstorage of the browser..
