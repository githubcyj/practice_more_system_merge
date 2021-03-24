import { request } from 'umi'

export function startBuilding (data) {
    return request('/api/buildTask/customerSuccess/saveBuildTask', {
        method: 'POST',
        data
    })
}