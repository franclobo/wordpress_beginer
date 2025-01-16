import { useParams } from 'react-router';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import Button from "../components/button"
import Header from "../components/header"

const Media = () => {
  const { groupId } = useParams();
  const { data } = useContext(DataContext);

  const group = data.find((g) => g.id === Number(groupId));

  if (!group) return <p>Group not found</p>;
  return (
    <div className="media">
      <Header group={group} />
      <div className="media-container">
        <h3>Not media yet</h3>
        <p>Once people start posting photos or videos, you’ll be able to see them all here.</p>
        <Button title="Create Post" action={() => console.log('Post Media')} />
      </div>
    </div>
  )
}

export default Media
