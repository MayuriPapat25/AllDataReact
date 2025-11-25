import { translations } from "../../../shared/translations"
import { Button } from "../../../shared/ui/Buttons/Button"

const LoginForm = ({ onLogin, variant = "alldata" }) => {
    const date = "June 22, 2021"
    const content = {
        alldata: {
            subtitle: translations?.allreacy_customer_access_account_here,
            description: translations?.trial_customer_prof_customer_only,
        },
        diy: {
            subtitle: `${translations?.login_here_DIY_accounts}${date}${translations?.or_later}`,
            description:
                '(For DIY accounts created BEFORE June 22, 2021, login at https://alldata.com/classic-diy OR select "ALLDATAdiy.com Login" from the LOG IN menu in the upper right hand corner of the previous screen)',
        },
    }

    const currentContent = content[variant]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{translations?.log_in_account}</h2>
                <p className="text-gray-600 mb-4">{currentContent.subtitle}</p>
                <p className="text-sm text-gray-500 mb-8">{currentContent.description}</p>
            </div>

            <Button
                onClick={onLogin}
                variant="outline"
                className="w-full max-w-[200px] border-orange-500 text-blue-950 font-medium py-2 px-8 bg-transparent"
            >
                {translations?.log_in}
            </Button>
        </div>
    )
}

export default LoginForm
