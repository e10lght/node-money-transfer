import axios from "axios";
import { useEffect, useState } from "react"

export const Form = (props) => {
    const { users, getUsers } = props
    // const [users, setUsers] = useState([]);
    const [sendUser, setSendUser] = useState('')
    const [receiveUser, setReceiveUser] = useState('')
    const [amount, setAmount] = useState(0)
    const [msg, setMsg] = useState('')

    const onChangeSendUser = (e) => setSendUser(e.target.value)

    const onChangeReceiveUser = (e) => setReceiveUser(e.target.value)
    const onChangeAmount = (e) => setAmount(e.target.value)

    // const getUsers = async () => {
    //     const response = await axios.get('/transfer/user')
    //     setUsers(response.data)
    // }
    // useEffect(() => {
    //     getUsers()
    // }, [])

    const submit = async (e) => {
        e.preventDefault()
        const sUser = sendUser.split('|')[0].trim()
        const rUser = receiveUser.split('|')[0].trim()
        const data = {
            sendUser: sUser,
            receiveUser: rUser,
            amount: amount,
        }
        try {
            const response = await axios.post('/transfer', data)
            console.log(response.data.message)
            setMsg(response.data.message)
            getUsers()
        } catch (error) {
            console.log(error.response.data.message)
            setMsg(error.response.data.message)
        }
    }
    return (
        <form className='w-96 my-5'>
            <div className='flex flex-col'>
                送金するユーザの選択
                <select onChange={onChangeSendUser}>
                    <option></option>
                    {users.map((user) => (
                        <option key={user.user_id}>{user.user_email} | {user.user_name}</option>
                    ))}
                </select>
                送金先ユーザの選択
                <select onChange={onChangeReceiveUser} defaultValue={users[0]}>
                    <option></option>
                    {users.map((user) => (
                        <option key={user.user_id} >{user.user_email} | {user.user_name}</option>
                    ))}
                </select>
                振り込み金額
                <input type='text' value={amount} onChange={onChangeAmount} />
            </div>
            <input
                className="border-solid border-2 border-black rounded cursor-pointer bg-black text-white px-2"
                type='submit'
                value='送信'
                onClick={submit}
            />
            {msg}
        </form>
    )
}