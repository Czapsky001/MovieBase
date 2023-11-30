import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = { username, password };

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

        console.log(response);
      if(response.ok) {
        alert('Pomyślnie zalogowano Zdzisiu!');
        dispatch({ type: 'SET_LOGIN_CLICKED', payload: false });
      } else {
        console.log('Niepoprawne dane logowania');
        alert('Niepoprawne dane logowania');
      }
    } catch (error) {
      console.error('Błąd podczas logowania', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto'
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label>
        Login:
        <input
          style={inputStyle}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Hasło:
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input style={buttonStyle} type="submit" value="Zaloguj" />
    </form>
  );
}; 

export default LoginForm;