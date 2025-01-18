import { useParams, useNavigate } from 'react-router';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import Header from '../components/header';
import Button from '../components/button';
import Topics from '../components/topics';

const Discussions = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { data } = useContext(DataContext);

  const group = data.find((g) => g.id === Number(groupId));

  if (!group) return <p>Group not found</p>;

  return (
    <div className="discussions">
      <Header group={group} />
      <div className="discussion-container">
        <div className="left-side">
          <div className="discussion-item">
            <div className="user-info">
              <img src="https://via.placeholder.com/150" alt="user" className="user-image" />
              <div className="user-details">
                <h3>{group.creator}</h3>
                <p>
                  {group.created_at} - <span>Joined the group</span>
                </p>
              </div>
            </div>
            <div className="discussion-topics">
              {group.topics.map((topic) => (
                <Topics
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  replies={topic.replies}
                  voices={topic.voices}
                  author={topic.author}
                  created_at={topic.created_at}
                  last_post={topic.last_post}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="right-side">
          <section className="about">
            <h3>About</h3>
            <p>
              {group.description || 'No description available.'}
              <span onClick={() => navigate(`/groups/${group.id}/about`)} className="see-all-members">Read more</span>
            </p>
          </section>
          <section className="members">
            <h3>Members</h3>
            <div className="member">
              <div className="user-info">
                <img src="https://via.placeholder.com/150" alt="Group" className="user-image" />
                <p>{group.creator}</p>
              </div>
              <Button title="Follow" action={() => console.log('Join')} />
            </div>
            <p onClick={() => navigate(`/groups/${group.id}/members`)} className="see-all-members">
              See all Members <span>
                {/*contar el número de miembros */}
                {group.members}
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
