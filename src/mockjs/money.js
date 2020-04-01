import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 60
let typelist = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    income: Mock.Random.integer(0, 9999),
    pay: Mock.Random.integer(0, 9999), 
    accoutCash: Mock.Random.integer(0, 9999),
    'incomePayType|1': typelist
  }))
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getMoneyList: config => {
    const { name, page = 1, limit = 20 } = mUtils.param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.username.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        moneyList: pageList
      }
    }
  },
}