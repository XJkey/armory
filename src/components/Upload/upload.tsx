import React, { FC, useState, useEffect, useRef, ChangeEvent, Children } from "react";
import axios from "axios";
import Button from "../Button/button";
import { UploadList } from "./upLoadList";
import { Dragger } from "./dragger"
import Icon from "../Icon/icon";


export type UploadFileStatus = "ready" | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any },
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    children?: React.ReactNode;
    drag?: boolean;
}

export const Upload: FC<UploadProps> = (props: any) => {
    const { action, onProgress, onSuccess, onError, beforUpload, onChange, defaultFileList, onRemove,
        headers, name, data, withCredentials, accept, multiple, children, drag } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [filelist, setFilelist] = useState<UploadFile[]>(defaultFileList || []);
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFilelist(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        });
    }

    useEffect(() => {
    }, []);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        uploadFile(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    }

    const handleRemove = (file: UploadFile) => {
        setFilelist((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file);
        }
    }

    const uploadFile = (files: FileList) => {
        let postFile = Array.from(files);
        postFile.forEach(file => {
            if (!beforUpload) {
                post(file);
            } else {
                const result = beforUpload(file);
                if (result && result instanceof Promise) {
                    result.then(progressFile => {
                        post(progressFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + "upload_file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        //setFilelist([_file, ...filelist])
        setFilelist((prevList) => {
            return [_file, ...prevList]
        })
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" })
                    onProgress && onProgress(percentage + "%", file)
                }
            }
        }).then((res) => {
            updateFileList(_file, { status: "success", response: res.data })
            onSuccess && onSuccess(res.data, file);
            onChange && onChange(file);
        }).catch(err => {
            updateFileList(_file, { status: "error", error: err })
            onError && onError(err, file);
            onChange && onChange(file);
        })
    }

    console.log(filelist);
    //http://jsonplaceholder.typicode.com/posts
    return (
        <div className="viking-upload-component">
            <span onClick={handleClick}>
                {drag ?
                    <Dragger onFile={uploadFile} style={{ fontSize: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Icon icon={"upload"} />
                    </Dragger> :
                    (children ? children : <Button btnType="primary" size="sm">Upload File</Button>)}
            </span>
            <input type="file" className="viking-file-input" style={{ "display": "none" }}
                ref={fileInput} onChange={handleFileChange} accept={accept} multiple={multiple} />
            <UploadList filelist={filelist} onRemove={handleRemove} />
        </div>
    );
}

Upload.defaultProps = {
    name: "file"
}
export default Upload;