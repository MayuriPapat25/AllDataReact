import React from "react"

import { useRef, useState } from "react"
import { cn } from "../../utils/utils"
import InputField from "../../../shared/ui/InputField/index"
import { Button } from "../Buttons/Button"


const FileUpload = ({ label, onChange, accept, helperText, required = false, className }) => {
    const [fileName, setFileName] = useState("")
    const fileInputRef = useRef(null)

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null
        setFileName(file ? file.name : "")
        onChange(file)
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={cn("space-y-2", className)}>
            <label>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </label>
            <div className="flex items-center gap-3 p-3 border border-input rounded-md bg-background border-gray-300 ">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleButtonClick}
                    className="shrink-0 bg-transparent"
                >
                    {/* <Upload className="h-4 w-4 mr-2" /> */}
                    Choose file
                </Button>
                <span className="text-sm text-muted-foreground truncate">{fileName || "No file chosen"}</span>
                <input ref={fileInputRef} type="file" onChange={handleFileChange} accept={accept} className="hidden" />
                <InputField
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />

            </div>
            {helperText && <div className="text-xs text-gray-500 leading-relaxed">{helperText}</div>}
        </div>
    )
}

export default FileUpload
