import React from 'react'

export const cn = (...classes: Array<string | undefined | null | false>) => classes.filter(Boolean).join(' ')

export const Button = ({
    children,
    onClick,
    className,
    'aria-label': ariaLabel
}: {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
    'aria-label'?: string
    size?: string
    mode?: string
    stretched?: boolean
}) => (
    <button
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
    >
        {children}
    </button>
)

export const Skeleton = ({ style }: { style?: React.CSSProperties }) => (
    <div
        data-testid='skeleton'
        style={style}
    />
)

export const Dialog = ({
    children,
    open,
    onCloseDialog,
    title,
    showCloseButton
}: {
    children?: React.ReactNode
    open?: boolean
    onCloseDialog?: () => void
    title?: string
    showCloseButton?: boolean
    maxWidth?: string
}) => {
    if (!open) {
        return null
    }

    return (
        <div
            role='dialog'
            aria-label={title}
        >
            {showCloseButton && (
                <button
                    onClick={onCloseDialog}
                    aria-label='close'
                >
                    X
                </button>
            )}
            <div>{title}</div>
            {children}
        </div>
    )
}
