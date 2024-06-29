interface QuoteProps {
    text: string;
}

export const Quote = ({text}: QuoteProps) => {
    return (
        <div className="m-2 border-l-4 border-accent flex flex-col p-3 items-center justify-center w-fit h-fit bg-gradient-to-br from-secondary to-primary">
            <blockquote className="text-md font-mono text-center text-primary-foreground">
                {text}
            </blockquote>
        </div>
    )
}