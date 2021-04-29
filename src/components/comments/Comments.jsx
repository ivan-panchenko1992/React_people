import React from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';

export const Comments = ({ deleteComment, comments }) => (
  <div className="comments">
    <h4>Hero comments:</h4>
    {comments && comments.map((comment) => (
      <div
        className="comments__item"
        key={comment.id}
      >
        <p>{comment.title}</p>
        <button
          type="button"
          className="comments__button"
          onClick={() => deleteComment(comment.id)}
        >
          X
        </button>
      </div>
    ))}
  </div>
);

Comments.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

Comments.defaultProps = {
  comments: [],
};
