import Link from 'next/link';
import Messages from './messages';
import Button from '../_components/Button';

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-lg font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-secondary mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-lg font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-secondary mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button text="Sign In" fullWidth marginZero />
        <Button text="Sign Up" formAction="/auth/sign-up" fullWidth transparent marginZero />
        <Messages />
      </form>
    </div>
  );
}
