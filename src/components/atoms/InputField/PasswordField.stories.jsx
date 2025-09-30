import PasswordField from './PasswordField'

export default {
    title: 'Atoms/PasswordField',
    component: PasswordField,
    args: {
        id: 'password',
        label: 'Password',
        placeholder: 'CREATE A PASSWORD',
        value: '',
        error: '',
        helperText:
            'Password must be at least 8 characters and include 3 of: number, lowercase, uppercase, symbol (!@#$%&? ,*)',
        required: true,
    },
    argTypes: {
        onChange: { action: 'changed' },
    },
}

export const Default = {}

export const WithError = {
    args: {
        error: 'Password is too weak',
    },
}

export const Prefilled = {
    args: {
        value: 'Abcdef1!',
    },
}


