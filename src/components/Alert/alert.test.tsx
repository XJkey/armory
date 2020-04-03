import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Alert, { AlertProps, AlertStyleType } from "./alert";


const defaultProps = {
    onClose: jest.fn()
}

describe('test Alert Component', () => {
    it('测试Default Alert', () => {
        const wrapper = render(<Alert {...defaultProps}></Alert>);
        const element = wrapper.container;
        expect(element).toBeInTheDocument();
        const closeBtn=wrapper.getByText('×') as HTMLElement
        const alert=element.querySelector('.alert') as HTMLElement
        expect(closeBtn.tagName).toEqual("I");
        expect(alert).toHaveClass('alert alert-default');
        fireEvent.click(closeBtn);
        expect(alert).not.toBeInTheDocument();
        expect(defaultProps.onClose).toHaveBeenCalled();
    })
})