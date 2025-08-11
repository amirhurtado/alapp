'use client'

import { ChevronDown, ChevronUp } from "lucide-react";


interface ReplyControlsProps {
    hasMore: boolean
    ocult: boolean
    setOcult: React.Dispatch<React.SetStateAction<boolean>>
    showResponses: () => void

    commentReponses: number
    repliesLength: number
}


const ReplyControls = ({hasMore, ocult, setOcult, showResponses, commentReponses, repliesLength} : ReplyControlsProps) => {
  return (
    <div className="flex gap-4 items-center text-text-gray max-w-max text-xs ">
        {(hasMore || ocult)  && (
          <button onClick={showResponses}>
            <div className="flex  gap-1 cursor-pointer hover:text-primary-color ">
              <p className="transition-colors duration-200 ease-in">
                {ocult
                  ? `Ver ${commentReponses} respuestas`
                  : `Ver ${commentReponses - repliesLength} respuestas`}
              </p>
              <ChevronDown size={20} />
            </div>
          </button>
        )}

        {repliesLength > 0 && !ocult && (
          <button onClick={() => setOcult((prev) => !prev)}>
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
