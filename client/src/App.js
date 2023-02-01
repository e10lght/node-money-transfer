import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { Table } from './components/Table';
import './index.css'

function App() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await axios.get('/transfer/user')
    setUsers(response.data)
  }
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={'bg-primary'}>
      <div className='mx-5'>
        <h1 className="text-3xl font-bold underline">
          ユーザ間送金アプリ
        </h1>

        <Form users={users} getUsers={getUsers} />
        <Table users={users} />
      </div>
    </div>
  );
}

export default App;
