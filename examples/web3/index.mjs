import { api } from '@serverless/cloud'
import { Web3, createRaribleSdk } from './lib/index.cjs'
import { dayjs } from './lib/index.cjs'

const web3 = new Web3()

api.get('/', async (req, res) => {
    console.log(dayjs().format())
    console.log(typeof web3, typeof createRaribleSdk)
    res.status(200).send()
})
