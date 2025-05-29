// import axios from 'axios';

// async function getTestToken() {
//   try {
//     // Login request
//     const response = await axios.post('http://localhost:3000/api/auth/login', {
//       email: 'jwohen@example.com',
//       password: 'mypassword'
//     });

//     console.log('Login successful!');
//     console.log('Your token:', response.data.token);
    
//     // Test the token by getting users
//     const usersResponse = await axios.get('http://localhost:3000/api/users', {
//       headers: {
//         Authorization: `Bearer ${response.data.token}`
//       }
//     });

//     console.log('\nUsers retrieved successfully:', usersResponse.data);
//   } catch (error: any) {
//     console.error('Error:', error.response?.data || error.message);
//   }
// }

// getTestToken();
