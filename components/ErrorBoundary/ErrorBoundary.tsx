import React from 'react'

type ErrorBoundaryProps = {
    children: React.ReactNode
    fallback: React.ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    public static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, info)
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary
