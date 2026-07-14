import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Page Not Found</h2>
      <p className="text-slate-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-light">
        Return to Homepage
      </Link>
    </div>
  );
}
