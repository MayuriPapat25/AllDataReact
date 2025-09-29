import React from 'react'

const TitleValue = ({ title, value, isPromotionalRate }) => {
    return (
        <div className="flex justify-between items-center bg-white px-7 py-7 mt-1">
            <span className="text-foreground font-medium">{title}</span>

            <span className="text-muted-foreground font-medium">
                {value}
                {isPromotionalRate && "*"}
            </span>
        </div>
    )
}

export default TitleValue
