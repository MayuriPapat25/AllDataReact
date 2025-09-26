import { useState } from "react"
import InputField from "../../atoms/InputField"

const PhoneSignupForm = ({ onEdit }) => {
    const [phoneNumber, setPhoneNumber] = useState("999 898 9898")

    return (
        <>
            {
                phoneNumber === "" ?
                    <div className="w-full p-6 bg-[#f4f4f4] border-t-2 border-gray-400">
                        <div className="pt-3">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-wide">DON'T MISS OUT ON UPDATES AND OFFERS!</h2>

                            <div className="space-y-4">
                                <label className="block text-gray-600 text-lg font-medium">Mobile Phone</label>

                                <InputField
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="ENTER PHONE NUMBER"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <p className="text-gray-500 text-sm leading-relaxed mt-6">
                                    By entering your phone number above, you agree to receive recurring automated marketing messages, including
                                    cart reminders, at the phone number provided. Consent is not a condition of purchase. Reply STOP to
                                    unsubscribe. Reply HELP for help. Message frequency varies. Msg & data rates may apply. View our{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Privacy Statement
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Terms of Use
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="max-w-2xl pb-8 border-b-4 border-gray-300">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">MOBILE PHONE</h2>
                            <button variant="ghost" size="sm" onClick={onEdit} className="text-gray-500 hover:text-gray-700 font-medium">
                                EDIT
                            </button>
                        </div>
                        <p className="text-base text-gray-500">999 898 9898</p>
                    </div>
            }
        </>

    )
}


export default PhoneSignupForm