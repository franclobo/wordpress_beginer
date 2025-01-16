import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Search = ({ data, onFilter, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      onFilter([]); // Si no hay término, no mostramos resultados
      return;
    }

    // Filtrar los datos
    const filteredResults = data.flatMap((group) =>
      searchInGroup(group, term)
    );

    onFilter(filteredResults);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onFilter([]);
    onClose();
  };

  const searchInGroup = (group, term) => {
    let results = [];

    // Buscar en el título y descripción del grupo
    if (
      group.title.toLowerCase().includes(term) ||
      group.description.toLowerCase().includes(term)
    ) {
      results.push({
        type: 'group',
        id: group.id,
        title: group.title,
        description: group.description,
        path: `/groups/${group.id}`,
        match: 'Group'
      });
    }

    // Buscar en los topics del grupo
    group.topics.forEach((topic) => {
      if (topic.title.toLowerCase().includes(term)) {
        results.push({
          type: 'topic',
          groupId: group.id,
          topicId: topic.id,
          title: topic.title,
          description: topic.replies.map((reply) => reply.author).join(', '),
          path: `/groups/${group.id}/discussions/${topic.id}`,
          match: 'Topic'
        });
      }

      // Buscar en las respuestas de los topics
      topic.replies.forEach((reply) => {
        if (reply.author.toLowerCase().includes(term)) {
          results.push({
            type: 'reply',
            groupId: group.id,
            topicId: topic.id,
            replyId: reply.id,
            title: topic.title,
            description: reply.author,
            path: `/groups/${group.id}/discussions/${topic.id}#reply-${reply.id}`,
            match: 'Reply'
          });
        }
      });
    });

    return results;
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={clearSearch} className="clear-button">
          Clear
        </button>
      )}

      <div className="search-results">
        {searchTerm && (
          <ul>
            {data.length === 0 ? (
              <li>No groups found</li>
            ) : (
              data.map((result) => (
                <li key={result.id || result.topicId || result.replyId}>
                  <Link to={result.path}>
                    {result.match} - {result.title} ({result.description})
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilter: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
