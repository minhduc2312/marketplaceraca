import { key } from './env';
import web3 from './web3'

const account = web3.eth.accounts.privateKeyToAccount(key)
export default account