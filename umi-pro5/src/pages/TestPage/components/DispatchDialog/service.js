import { request } from 'umi'

export function dispatch (data) {
    return request('/api/customerSuccess/allotDeliveryConsultant', {
        method: 'POST',
        data
    })
}