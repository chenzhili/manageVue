/* 
    模拟 接口 测试 
*/
import axios from 'axios'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/src/vies/Home.vue'

console.log(Home);

jest.mock(axios);

let localVue = null;

describe('测试 Home 视图 ', () => {
    beforeEach(() => {
        localVue = createLocalVue();
    });
    

})
