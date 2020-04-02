/*
 * @Author: your name
 * @Date: 2020-04-02 22:06:20
 * @LastEditTime: 2020-04-02 22:19:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /TS-React/armory/jest.test.js
 */
//结果判断
test('test common matcher',()=>{
 expect(2+2).toBe(4);
 expect(2+2).not.toBe(5)
})

//转boolean判断
test('test to be true or false',()=>{
    expect(1).toBeTruthy();
    expect(0).toBeFalsy()
})


//转大小判断
test('test number',()=>{
    expect(4).toBeGreaterThan(3);
    expect(0).toBeLessThan(3)
})


//判断对象
test('test object',()=>{
    expect({name:'viking'}).toEqual({name:'viking'});
})
