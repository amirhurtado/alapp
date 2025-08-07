
import { ChevronDown, ChevronUp } from "lucide-react";


interface ReplyControlsProps {
    hasMore: boolean
    ocult: boolean
    handleOcult: () => void
    showResponses: () => void

    commentReponses: number
    dataLength: number
}


const ReplyControls = ({hasMore, ocult, handleOcult, showResponses, commentReponses, dataLength} : ReplyControlsProps) => {
  return (
    <div className="flex gap-4 items-center text-text-gray max-w-max text-xs ">
        {(hasMore || ocult) && (
          <button onClick={showResponses}>
            <div className="flex  gap-1 cursor-pointer hover:text-primary-color ">
              <p className="transition-colors duration-200 ease-in">
                {ocult
                  ? `Ver ${commentReponses} respuestas`
                  : `Ver ${commentReponses - dataLength} respuestas`}
              </p>
              <ChevronDown size={20} />
            </div>
          </button>
        )}

        {dataLength > 0 && !ocult && (
          <button onClick={handleOcult}>
            <div className="flex  gap-1 cursor-pointer hover:text-primary-color ">
              <p className=" transition-colors duration-200 ease-in ">
                Ocultar Todo
              </p>
              <ChevronUp size={20} />
            </div>
          </button>
        )}
      </div>
  )
}

export default ReplyControls
