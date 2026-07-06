import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-bgColor">
      <p className="text-sm uppercase tracking-[0.2em] text-primary-gray mb-2">404</p>
      <h1 className="text-3xl md:text-4xl font-semibold text-brand-light mb-4">Page not found</h1>
      <p className="text-primary-gray max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-accent to-primary-gray px-6 py-3 text-brand-light transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
