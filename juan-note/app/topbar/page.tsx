import React from 'react'

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    address: {
        street: string;
        suite: string;
    }
}

const UsersPage = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: "no-store"
    });
    const users: User[] = await response.json();

    return (
        <>
            <h1>Users</h1>
            <table className='table table-zebra rounded-box table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.address.street}
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </>
    )
}

export default UsersPage