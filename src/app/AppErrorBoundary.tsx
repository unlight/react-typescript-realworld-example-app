import React, { PropsWithChildren } from 'react';

/**
 * GLobal application error handler.
 */
export class AppErrorBoundary extends React.Component<PropsWithChildren<unknown>> {
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  readonly state = {
    error: undefined as any,
  };

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    const { error } = this.state;

    return error ? (
      <div className="">
        <h1>ERROR! Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
