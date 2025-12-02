import React, { useRef, useState } from "react"
import { cn } from "../../utils/utils"
import InputField from "../../../shared/ui/InputField/index"
import { Button } from "../Buttons/Button"
import { translations } from "../../translations"


const FileUpload = ({ label, onChange, accept = ".png,.jpg,.jpeg,.pdf", helperText, required = false, className, error,
    errorText, }) => {
    const [fileName, setFileName] = useState("")
    const fileInputRef = useRef(null)

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null
        setFileName(file ? file.name : "")
        onChange(file)
    }

    const handleRemove = () => {
        setFileName("");
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={cn("space-y-2", className)}>
            <label>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </label>
            {!fileName ? (
                <div className="flex items-center gap-3 p-3 border border-input rounded-md bg-background border-gray-300 ">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleButtonClick}
                        className="shrink-0 bg-transparent"
                    >
                        {/* <Upload className="h-4 w-4 mr-2" /> */}
                        {translations?.choose_file}
                    </Button>
                    <span className="text-sm text-muted-foreground truncate">{fileName || `${translations?.no_file_chosen}`}</span>
                    <input ref={fileInputRef} type="file" onChange={handleFileChange} accept={accept} className="hidden" />
                    <InputField
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept={accept}
                        className="hidden"
                    />

                </div>) :
                (<>
                    <div className="flex mt-2 items-center">
                        <p className="text-md mb-2 font-medium">{fileName}</p>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="ml-10"
                        >
                            {translations?.remove}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ">
                        {translations?.warning_reseller_certificate_not_qualify}
                    </p>
                </>)}
            {helperText && !fileName && (
                <div className="text-xs text-gray-500 leading-relaxed">{helperText}</div>
            )}
            {error && <p className="text-xs text-red-500">{errorText}</p>}
        </div>
    )
}

export default FileUpload
