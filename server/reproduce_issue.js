// const fetch = require('node-fetch'); // Using native fetch in Node 18+

const API_URL = 'http://localhost:8080/api';

async function main() {
    try {
        const email = `test_${Date.now()}@example.com`;
        const password = 'password123';

        // 0. Register
        console.log(`Registering user ${email}...`);
        const signupRes = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email,
                password
            })
        });

        const signupData = await signupRes.json();
        if (!signupRes.ok) {
            console.error('Signup failed:', signupData);
            return;
        }
        console.log('Signup successful.');

        // 1. Login
        console.log('Logging in...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });

        const loginData = await loginRes.json();

        if (!loginRes.ok) {
            console.error('Login failed:', loginData);
            return;
        }

        const token = loginData.token;
        console.log('Login successful. Token obtained.');

        // 2. Get Transactions
        console.log('Fetching transactions...');
        const txRes = await fetch(`${API_URL}/transactions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const txData = await txRes.json();
        console.log('Transaction Response:', JSON.stringify(txData, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}


main();
