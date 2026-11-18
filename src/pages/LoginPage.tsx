import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { HemloMark } from '../components/layout/MarketingNavbar';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useHemlo } from '../context/HemloContext';

export default function LoginPage() {
  useDocumentMeta({
    title: 'Sign in — HEMLO',
    description: 'Sign in to your HEMLO workspace.',
    noindex: true,
    canonicalPath: '/login',
  });

  const navigate = useNavigate();
  const { pushToast } = useHemlo();
  const [email, setEmail] = React.useState('maya@northstarstudio.co');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.trim().length < 4) {
      setError('Enter your password (or use the Demo Workspace button below).');
      return;
    }
    setError('');
    pushToast({ title: 'Welcome back to Northstar Podcast Studio', tone: 'success' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center p-5">
      <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold text-[#171B2B] font-display mb-8">
        <HemloMark className="h-8 w-8" />
        <span>HEMLO</span>
      </Link>

      <Card elevated className="w-full max-w-[440px] p-7 md:p-8">
        <h1 className="text-2xl font-extrabold text-[#171B2B] font-display">
          Welcome back
        </h1>
        <p className="text-sm text-[#646A7B] mt-1.5">
          Open your video clipping workspace and scheduled clips.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
              Work email
            </label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <p role="alert" className="text-xs font-semibold text-[#DC2626]">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="mt-5 pt-5 border-t border-[#E8EAEE] space-y-3">
          <Button
            variant="secondary"
            size="md"
            className="w-full"
            onClick={() => {
              pushToast({ title: 'Entered Demo Workspace', tone: 'info' });
              navigate('/dashboard');
            }}
          >
            Continue with Demo Workspace
          </Button>
          <p className="text-xs text-center text-[#646A7B]">
            Demo authentication preview — no real account credentials stored.
          </p>
        </div>
      </Card>
    </div>
  );
}
