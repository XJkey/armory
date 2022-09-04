import React, { FC, useState, useEffect, useRef, ChangeEvent } from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon"

interface UploadListProps {
    filelist: UploadFile[];
    onRemove: (_file: UploadFile) => void
}
export const UploadList: FC<UploadListProps> = (props) => {
    const { filelist, onRemove } = props;
    return (
        <ul className="viking-upload-list">
            {filelist.map(item => {
                return (
                    <li className="viking-upload-list-item" key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon="file" theme="secondary" />
                            {item.name}
                        </span>
                        <span className="file-status">
                            {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
                            {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                            {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                        </span>
                        <span className="file-actions">
                            <Icon icon="times" onClick={() => { onRemove(item) }} />
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}