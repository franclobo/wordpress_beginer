/**
 * crea un componente que contabilice los comentarios y los muestre, tiene que hacer un post al tema correspondiente en el json o DB
 */
import { TfiComments } from "react-icons/tfi";
import { useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState(0);
  const [commented, setCommented] = useState(false);
  const handleComment = () => {
    if (commented) {
      setComments(comments - 1);
    } else {
      setComments(comments + 1);
    }
    setCommented(!commented);
  };
  return (
    <div className="comments">
      <div onClick={handleComment}>
        {commented ? <TfiComments /> : <TfiComments />}
      </div>
      <p><span>{comments}</span> - comments </p>
    </div>
  );
}
export default Comments;