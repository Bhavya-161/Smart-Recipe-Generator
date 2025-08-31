interface AuthFormProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} style={{ maxWidth: '400px', marginTop: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label>Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="button">Login</button>
    </form>
  );
}
