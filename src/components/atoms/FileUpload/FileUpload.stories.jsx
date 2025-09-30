import FileUpload from './index'

export default {
    title: 'Atoms/FileUpload',
    component: FileUpload,
    args: {
        label: 'Upload Document',
        accept: '.pdf,.jpg,.png',
        helperText: 'Accepted formats: PDF, JPG, PNG',
        required: false,
    },
    argTypes: {
        onChange: { action: 'file-selected' },
    },
}

export const Default = {}

export const Required = {
    args: {
        required: true,
    },
}

export const ImagesOnly = {
    args: {
        label: 'Upload Image',
        accept: '.jpg,.jpeg,.png',
        helperText: 'Max size 5MB',
    },
}


