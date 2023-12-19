import {UsersList} from "../components/UsersList.jsx";

export const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Max Schwarz',
            image: 'https://avatars.githubusercontent.com/u/152809?s=460&u=9a2f2e8c5b1e5d8e3b2f3b5e0b5c6c3b4f4a5b2f&v=4',
            places: 3
        }
    ]
  return (<UsersList items={USERS}/>)
}

