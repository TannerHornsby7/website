'use client';
import { useEffect } from "react";

export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
// useEffect(() => {
//     // Log the error to an error reporting service
//     console.error(error)
//     }, [error])
  return (
    <div className="text-left">
        <h1 className="text-4xl font-bold text-gray-900">Oops! Something went wrong.</h1>
        <p className="mt-4 text-base">Here's a little something from Shakespeare to lighten the mood:</p>
        
        <blockquote className="mt-8 italic">
          <p>"To be, or not to be, that is the question:<br />
          Whether 'tis nobler in the mind to suffer<br />
          The slings and arrows of outrageous fortune,<br />
          Or to take arms against a sea of troubles<br />
          And by opposing end them."</p>
        </blockquote>
        
        <p className="mt-8 text-base">Please try navigating back to the homepage or check the links above.</p>
    </div>
  );
} 