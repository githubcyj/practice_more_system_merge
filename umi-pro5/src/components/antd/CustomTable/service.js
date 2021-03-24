import { request } from 'umi'

export function getCustomColumns (data) {
   return request('/api/customizefields/fields/listByLogin', {
      method: 'GET',
      data
   })
}