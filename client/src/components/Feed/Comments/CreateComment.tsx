import Avatar from "../../Avatar";

const CreateComment = ({userImageUrl} : {userImageUrl : string}) => {
  return (
    <div className="p-4 flex justify-between gap-3">
                <div className="flex gap-3 w-full">

                <Avatar src={userImageUrl} />
                <input type="text" className="outline-none  placeholder:font-poppins w-full border-none " placeholder="Deja tu comentario" />


                </div>
                <button aria-label="enviar comentario" className="text-icon-blue font-semibold text-sm cursor-pointer">Enviar</button>
            </div>
  )
}

export default CreateComment
