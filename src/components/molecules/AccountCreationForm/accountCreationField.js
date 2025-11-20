import { translations } from "../../../shared/translations";

export const accountCreationField = [
        {
            name: "email",
            label: translations?.general_account_communication,
            type: "email",
            required: true,
            placeholder: translations?.primary_email_address,
            errorMessage: translations?.enter_valid_email_address,
            helperText: "",
        },
        {
            name: "phone",
            label: translations?.business_shop_phone_number,
            type: "phone",
            required: true,
            placeholder: translations?.business_shop_phone_number,
            errorMessage: translations?.contact_number_error_msg,
            helperText: "",
        },
        {
            name: "username",
            label: translations?.user_name,
            type: "username",
            required: true,
            placeholder: translations?.create_username,
            errorMessage: translations?.username_required,
            helperText: translations?.username_helper_text,
        },
        {
            name: "password",
            label: translations?.password,
            type: "password",
            required: true,
            placeholder: translations?.create_password,
            errorMessage: translations?.password_helper_text,
            helperText: translations?.password_helper_text,
        },
        {
            name: "confirmPassword",
            label: translations?.confirm_password,
            type: "password",
            required: true,
            placeholder: translations?.reenter_password,
            errorMessage: translations?.passwords_do_not_match,
            helperText: "",
        },
    ];
