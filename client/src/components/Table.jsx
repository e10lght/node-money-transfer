import axios from "axios";
import { useEffect, useState } from "react";

export const Table = (props) => {
    const { users } = props
    // const [users, setUsers] = useState([]);
    // const getUsers = async () => {
    //     const response = await axios.get('/transfer/user')
    //     setUsers(response.data)
    //     console.log(response)
    //     console.log(response.data)
    // }
    // useEffect(() => {
    //     getUsers()
    // }, [])
    return (
        <table className='border-solid border-2 border-black'>
            <thead>
                <tr>
                    <th className='border-solid border-2 border-black'>id</th>
                    <th className='border-solid border-2 border-black'>ユーザ名</th>
                    <th className='border-solid border-2 border-black'>残高</th>
                    <th className='border-solid border-2 border-black'>最終取引日</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr>
                        <td className='border-solid border-2 border-black'>{user.user_id}</td>
                        <td className='border-solid border-2 border-black'>{user.user_name}</td>
                        <td className='border-solid border-2 border-black'>{user.balance.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}</td>
                        <td className='border-solid border-2 border-black'>{user.updatedAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}