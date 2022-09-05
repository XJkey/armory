import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Upload, UploadFile } from './upload';
import { Button } from '../Button/button';
const defaultFileList: UploadFile[] = [
    { uid: '121', size: 1234, name: 'hello.md', status: 'uploading', percent: 10 },
    { uid: '122', size: 233, name: 'xyz.md', status: 'success', percent: 50 },
    { uid: '123', size: 554, name: 'china.md', status: 'error', percent: 90 }

]

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

const chaeckFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 5000) {
        alert('file too big');
        return false;
    }
    return true;
}

const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
}
export const Default = () => (
    <div style={{ "textAlign": "left", "width": "300px" }}>
        <Upload action='http://jsonplaceholder.typicode.com/posts'
            onError={action("error")}
            onProgress={action("progress")}
            onSuccess={action("success")}
            onChange={action("change")}
            defaultFileList={defaultFileList}
            name="fileName"
            data={{ 'key': 'value' }}
            headers={{ "token": "123456" }}
            multiple={true}
            drag={true}
        // beforUpload={chaeckFileSize}
        >
            <Button btnType="danger" size="sm">Upload File</Button>
        </Upload>
    </div >

)

Default.parameters = {
    docs: {
        description: {
            //markeDwon语法：如果要换行,在上一行结尾打两个空格
            story: `
\`import Upload from armory/upload\`  
`,
        },
    },
};


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: '上传组件',
    component: Upload,
    //decorators: [(Story) => <div style={{ margin: '1px' }}>{Story()}</div>],
    argTypes: { onClick: { action: 'clicked' } },
    parameters: {
        docs: {
            description: {
                component: `>引用Upload
                import {Upload} from armory/upload`,
            },
        },
    },
} as ComponentMeta<typeof Upload>;

