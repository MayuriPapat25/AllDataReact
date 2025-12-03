import React, { useRef, useState } from "react"
import { cn } from "../../utils/utils"
import InputField from "../../../shared/ui/InputField/index"
import { Button } from "../Buttons/Button"
import { translations } from "../../translations"
import { useEffect } from "react"


const FileUpload = ({
    label,
    onChange,
    accept = ".png,.jpg,.jpeg,.pdf",
    helperText,
    required = false,
    className,
    error,
    errorText,
    value = null
}) => {
    const [fileName, setFileName] = useState("")
    const [fileUrl, setFileUrl] = useState(null);
    const fileInputRef = useRef(null)

    // derive display name + url from incoming `value`
    useEffect(() => {
        if (!value) {
            setFileName("");
            setFileUrl(null);
            return;
        }

        // File instance
        if (value instanceof File) {
            setFileName(value.name || "");
            setFileUrl(null);
            return;
        }

        // object with name + url/dataUrl
        if (typeof value === "object" && value !== null) {
            const name = value.name || value.fileName || value.file?.name || "";
            const url = value.dataUrl || value.url || null;
            setFileName(name);
            setFileUrl(url);
            return;
        }

        // string url or data-url
        if (typeof value === "string") {
            const parts = value.split("/").pop().split("?")[0];
            setFileName(parts || value);
            setFileUrl(value);
            return;
        }

        setFileName("");
        setFileUrl(null);
    }, [value]);


    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFileName(file.name);
            setFileUrl(null);
            // send File to parent (so they can autosave or transform to base64)
            onChange && onChange(file);
        } else {
            // no file chosen
            setFileName("");
            setFileUrl(null);
            onChange && onChange(null);
        }
    };

    const handleRemove = () => {
        // clear local UI
        setFileName("");
        setFileUrl(null);
        // clear input value so same file can be chosen again
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
        // notify parent
        onChange && onChange(null);
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
                        {/* show link if we have a url/dataUrl for persisted file */}
                        {fileUrl && (
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-sm underline"
                            >
                                {translations?.view || "View"}
                            </a>
                        )}

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
