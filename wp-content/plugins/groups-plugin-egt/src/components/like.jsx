/*
crea un componente que de likes y los contabilice si el mismo usuario vueleve a dar click el like se despinta y la cuenta disminuye, si no hay likes se muestra en cero, tiene que hacer un post al tema correspondiente en el json o DB
*/
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
const Like = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  return (
    <div className="like">
      <div onClick={handleLike}>
        {liked ? <AiFillLike /> : <AiOutlineLike />}
      </div>
      <span>{likes}</span>
    </div>
  );
};
export default Like;