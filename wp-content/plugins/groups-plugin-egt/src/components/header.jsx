import { PropTypes } from "prop-types";
import Button from "../components/button";
import { Link, useLocation } from "react-router-dom"; // Importar useLocation
import Search from "./search"; // Importa el componente Search

const Header = ({ group }) => {
  const location = useLocation(); // Obtener la ubicación actual de la página

  const links = [
    { name: "Discussions", path: `/groups/${group.id}/discussions` },
    { name: "Media", path: `/groups/${group.id}/media` },
    { name: "Members", path: `/groups/${group.id}/members` },
    { name: "About", path: `/groups/${group.id}/about` },
  ];

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Groups", path: "/groups" },
    { name: group.title, path: `/${group.id}/discussions` },
  ];

  return (
    <header>
      <div className="navigation-bar">
        {navigation.map((navigate, index) => (
          <Link to={navigate.path} key={index}>
            {navigate.name}
            {index < navigation.length - 1 && <span> {">"} </span>}
          </Link>
        ))}
      </div>
      <img
        src="https://via.placeholder.com/150"
        alt="Group 1"
        className="image-header"
      />
      <div className="title-bar">
        <div className="header-title">
          <h2>{group.title}</h2>
          <p>
            {group.type || "Public"} -{" "}
            <span>
              {!group.members || group.members === 1
                ? `1 member`
                : `${group.members} members`}
            </span>
          </p>
        </div>
        <div className="search">
          <Search
            data={[group]}
            onFilter={(results) => console.log(results)}
            onClose={() => {}}
          />
          <div className="line" />
          <Button title="Join" action={() => console.log("Join")} />
        </div>
      </div>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              {/* Aquí se aplica el estilo si la ruta actual coincide con el enlace */}
              <a
                href={link.path}
                style={{
                  borderBottom: location.pathname === link.path ? "3px solid black" : "none",
                  paddingBottom: "20px",
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

Header.propTypes = {
  group: PropTypes.object.isRequired,
};
