import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorText?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorText: "",
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    console.log(error.stack);

    this.setState((state) => ({
      ...state,
      errorText: error.message + "\n" + errorInfo.componentStack,
    }));
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="errorBlock">
          <h1>Sorry.. there was an error</h1>
          <p>{this.state.errorText}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
