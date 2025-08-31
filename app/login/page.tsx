'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    interface User {
      email: string;
      password: string;
      name?: string;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Save logged-in user
      localStorage.setItem('currentUserEmail', user.email); // key used for saved recipes
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Ensure each user has their own saved recipes array
      const savedKey = `savedRecipes_${user.email}`;
      if (!localStorage.getItem(savedKey)) {
        localStorage.setItem(savedKey, JSON.stringify([]));
      }

      router.push('/'); // redirect to home
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">Login</button>
      </form>
      <p>
        New user? <a href="/signup">Create an account</a>
      </p>
    </div>
  );
}
