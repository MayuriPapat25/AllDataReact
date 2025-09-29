const ImageTitleValue = ({ name, accessPoints, monthelyPrice, icon, paymentFrequency, isPromotionalRate, promotionMsg }) => {

    return (
        <div className="bg-white px-7 py-7 shadow-sm mt-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    {
                        icon &&
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="relative">
                                {/* <Car className="w-8 h-8 text-white" /> */}
                                {/* <div
                                className={cn("w-12 h-12 rounded-full flex items-center justify-center", iconStyles)}
                            >
                                <IconComponent className="w-6 h-6" />
                            </div> */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    }


                    {/* Content */}
                    <div>
                        {
                            name && <h2 className="text-xl font-bold text-gray-900 tracking-wide">{name}</h2>
                        }
                        {
                            promotionMsg && <h5 className="text-gray-500 text-sm">{promotionMsg} {isPromotionalRate}</h5>
                        }
                        {
                            accessPoints && <p className="text-gray-500 text-sm mt-1">Access Points: {accessPoints}</p>
                        }
                    </div>
                </div>

                {/* Price */}
                <div className="text-right">
                    {
                        monthelyPrice && <h5 className="text-2xl font-bold text-gray-900">{monthelyPrice} {isPromotionalRate && "*"}</h5>
                    }
                    {
                        paymentFrequency && <h5 className="text-gray-500 text-sm">{paymentFrequency}</h5>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageTitleValue