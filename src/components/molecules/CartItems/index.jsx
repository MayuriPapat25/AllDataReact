import React from 'react'
import { ProductName } from '../../../shared/ui/TextIcon/ProductName'
import repairIcon from "../../../assets/images/repair_color.png"

function CartItems({ data }) {
    console.log('data', data)
    return (
        <div className="mb-6 shadow-lg bg-white">
            {data.map((item, index) => (
                <div
                    key={item.id}
                    className={`px-6 py-8 ${index !== data.length - 1 ? "border-b border-light-smoky-white" : ""}`}
                >
                    {/* Desktop */}
                    <div
                        className="hidden sm:grid items-center gap-4"
                        style={{ gridTemplateColumns: "1fr 144px" }} // removed delete column
                    >
                        {/* Product Info */}
                        <div className="flex items-center gap-3">
                            <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                            <div>
                                <ProductName name={item.name} />
                                <div className="text-sm text-gray-500">
                                    Access Points: {item?.accessPoints}
                                </div>
                            </div>
                        </div>

                        {/* Price + Info */}
                        <div className="text-right">
                            <div className="font-medium">${item.monthlyPrice ?? "0.00"}</div>
                            <div className="text-sm text-gray-500">
                                {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                            </div>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden space-y-2">
                        {/* Product Info */}
                        <div className="flex items-center gap-3">
                            <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                            <ProductName name={item.name} />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartItems
