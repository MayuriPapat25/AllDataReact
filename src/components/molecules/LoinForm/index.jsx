
import { Button } from "../../atoms/Buttons/Button"


const LoginForm = ({ onLogin }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">LOG IN TO YOUR ACCOUNT</h2>
                <p className="text-gray-600 mb-4">Already an ALLDATA Customer? Access your account here.</p>
                <p className="text-sm text-gray-500 mb-8">
                    Trial customers, please create a new account. For ALLDATA professional customers only.
                </p>
            </div>

            <Button
                onClick={onLogin}
                variant="outline"
                className="w-full max-w-[200px] border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-2 px-8 bg-transparent"
            >
                LOG IN
            </Button>
        </div>
    )
}

export default LoginForm