import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router";
import Button from "../components/button";

const Home = () => {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="title">
        <h2>Our Groups</h2>
      </div>
      <div className="table-container">
        {data && data.length > 0 ? (
          data.map((group, index) => (
            <div key={index} className="item">
              <div className="description">
                <div className="info">
                  <div className="image">
                    <img src={group.image} alt={group.title} />
                  </div>
                  <div className="item-title">
                    <h4
                      onClick={() =>
                        navigate(`/groups/${group.id}/discussions`)
                      }
                    >
                      {group.title}
                    </h4>
                    <p>
                      {group.type || "Public"} -{" "}
                      <span>
                        {!group.members || group.members === 1
                          ? `1 member`
                          : `${group.members} members`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <Button title="Join" action={() => console.log("Join")} />
            </div>
          ))
        ) : (
          <p>No groups yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
