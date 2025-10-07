import React from 'react'
import { ProductName } from '../../atoms/TextIcon/ProductName'
import repairIcon from "../../../assets/images/repair_color.png"

function CartItems({ data }) {
    return (
        <div className="mb-6 bg-white shadow-sm">
            {data.map((item, index) => (
                <div
                    key={item.id}
                    className={`p-4 ${index !== data.length - 1 ? "border-b border-[#faf9f9]" : ""}`}
                >
                    {/* Desktop */}
                    <div
                        className="hidden sm:grid items-center gap-4"
                        style={{ gridTemplateColumns: "1fr 144px 1fr" }} // removed delete column
                    >
                        {/* Product Info */}
                        <div className="flex items-center gap-3">
                            <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                            <ProductName name={item.name} />
                        </div>

                        {/* Price + Info */}
                        <div className="text-right">
                            <div className="font-medium">${item.price.toFixed(2)}</div>
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
