import SelectField from './index'

export default {
    title: 'Atoms/SelectField',
    component: SelectField,
    args: {
        label: 'State',
        required: true,
        options: [
            { value: '', label: '- Select -' },
            { value: 'CA', label: 'California' },
            { value: 'NY', label: 'New York' },
        ],
    },
}

export const Default = {}


