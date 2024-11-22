import axios from 'axios'
import type { VercelRequest, VercelResponse } from '@vercel/node'

interface RequestBody {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: '' | 'deletions' | 'reorder'
  data: { [key: string]: unknown }
}
export default async function (req: VercelRequest, res: VercelResponse) {
  const {
    endpoint = '',
    method = 'GET',
    data
  } = (req.body || {}) as Partial<RequestBody>
  const { data: responseValue } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${endpoint}`,
    method,
    headers: {
      'content-type': 'application/json',
      //       TODO_APIKEY='KDT8_bcAWVpD8'
      // TODO_USERNAME='KDT8_JSUYA'
      apikey: 'KDT8_bcAWVpD8',
      username: 'KDT8_JSUYA'
    },
    data
  })
  res.status(200).json(responseValue)
}
