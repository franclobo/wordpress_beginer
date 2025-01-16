import { useParams } from 'react-router';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import Header from '../components/header'
import Button from '../components/button'
import Search from '../components/search'

const Members = () => {
  const { groupId } = useParams();
  const { data } = useContext(DataContext);

  const group = data.find((g) => g.id === Number(groupId));

  if (!group) return <p>Group not found</p>;
  return (
    <div className="members">
      <Header group={group} />
      <div className="members-container">
        <nav>
          <p>Filter By: <span>All Members</span></p>
          <Search />
        </nav>
        <div className="members-item">
          <div className="member-info">
            <img src="https://via.placeholder.com/150" alt="Group" className="user-image"/>
            <p>{group.creator}</p>
          </div>
          <Button title="Follow" action={() => console.log('Join')} />
        </div>
      </div>
    </div>
  )
}

export default Members
