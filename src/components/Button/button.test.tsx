import React from 'react';
import { render } from "@testing-library/react";
import Button from "./button";


describe('test Button Component', () => {
    it('测试Default Button', () => {
        const wrapper = render(<Button>Nice</Button>);
        const element = wrapper.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual("BUTTON");
        expect(element).toHaveClass('btn btn-default')
    })

    it('测试不同属性Button', () => {

    })

    it('测试Link Button', () => {

    })

    it('测试disabled属性', () => {

    })
})