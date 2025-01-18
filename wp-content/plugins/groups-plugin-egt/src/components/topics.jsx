import PropTypes from 'prop-types';
import Like from './like';
import Comments from './comments';

const Topics = ({ id, title, replies, voices, author, created_at, last_post }) => {
  return (
    <div className="topics" key={id}>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="topics-info">
        <p>
          <span>{replies.length} replies</span> - <span>{voices} voices</span>
        </p>
        <p>
          {author} - <span>{created_at}</span> - <span>{last_post}</span>
        </p>
      </div>
      <div className="like-comments">
        <Like />
        <Comments />
      </div>
      <div className="add-comment">
        <textarea placeholder="Add a comment..." />
      </div>
      {replies.length > 0 && (
        <div className="replies">
          <h3>Replies</h3>
          {replies.map((reply) => (
            <div className="replies-info" key={reply.id}>
              <p>{reply.author}</p>
              <p>{reply.created_at}</p>
              <div className="like-comments">
                <Like />
                <Comments />
              </div>
              <div className="add-comment">
                <textarea placeholder="Add a comment..." />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Topics.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  replies: PropTypes.array.isRequired,
  voices: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  last_post: PropTypes.string.isRequired,
};

export default Topics;
