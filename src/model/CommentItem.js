import moment from 'moment';
import PropTypes from 'prop-types';
import { UserShape } from './User';

export default class CommentItem {
  constructor(user, contents, date) {
    this.user = user;
    this.contents = contents;
    this.date = date;
  }
}

export function postCommentBody(contents) {
  return { ...new CommentItem(null, contents, moment().valueOf()) };
}
export const CommentItemPropType = PropTypes.shape({
  user: UserShape,
  contents: PropTypes.string,
  date: PropTypes.string,
});
