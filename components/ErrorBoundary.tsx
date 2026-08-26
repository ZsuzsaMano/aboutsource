// RepositoriesErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

export default class RepositoriesErrorBoundary extends Component<{
  children: ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 my-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <p>Could not load repositories.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
