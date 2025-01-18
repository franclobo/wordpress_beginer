import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { useNavigate } from 'react-router';
import Button from "../components/button"
import Categories from "../components/categories"
const Groups = () => {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();
  const groups_links = [
    {
      "title": "All",
      "link": "#"
    },
    {
      "title": "My Groups",
      "link": "#"
    }
  ]
  return (
    <div className="groups">
      <h2>Join Goups</h2>
      <p>View groups and posts below.</p>
      <div className="search-navbar">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <Categories />
      </div>
      <div className="table-container">
        <div className="table">
          <nav>
            <ul>
              {groups_links.map((link, index) => (
                <li key={index}>
                  <a href={link.link}>{link.title} <span>{'( 6 )'}</span></a>
                </li>
              ))}
            </ul>
          </nav>
          {data && data.length > 0 ? (
            data.map((group, index) => (
              <div
                key={index}
                className="item"
              >
                <div className="description">
                  <div className="info">
                    <div className="image">
                      <img src={group.image} alt={group.title} />
                    </div>
                    <div className="item-title">
                      <h4 onClick={() => navigate(`/groups/${group.id}/discussions`)}>{group.title}</h4>
                      <p>
                        {group.type} - <span>{group.members} members</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Button title="Join" action={() => console.log('Join')} />
              </div>
            ))
          ) : (
            <p>No groups yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Groups
