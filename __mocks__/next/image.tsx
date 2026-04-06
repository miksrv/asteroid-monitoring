import React from 'react'

type ImageProps = {
    src: string | { src: string; height: number; width: number; blurDataURL?: string }
    alt: string
    width?: number
    height?: number
    className?: string
    style?: React.CSSProperties
}

const Image = ({ src, alt, width, height, className, style }: ImageProps) => {
    const srcValue = typeof src === 'string' ? src : src?.src ?? ''

    return (
        <img
            src={srcValue}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
        />
    )
}

export default Image
