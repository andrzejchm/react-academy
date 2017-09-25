import wrap from '../responseWrapper';
import comments from '../../db/comments';

export default function commentsList(req, res) {
  let commentsForRepair = comments.getCommentsForRepair(req.params.id);
  commentsForRepair = commentsForRepair || [];
  res.json(wrap(commentsForRepair));
}
