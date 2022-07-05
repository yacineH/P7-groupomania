import React from 'react'
import { AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai'

export default function Like({ likes, dislikes, callBack }) {
      const handleLikeClick = (event) => {
            event.preventDefault()
            callBack('likes')
      }

      const handleDislikeClick = (event) => {
            event.preventDefault()
            callBack('dislikes')
      }

      return (
            <div
                  style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                  }}
            >
                  <div style={{ margin: '10px' }}>
                        <span>{likes}</span>
                        <button
                              style={{ margin: '3px', border: '0px' }}
                              name="likes"
                              onClick={handleLikeClick}
                        >
                              <AiTwotoneLike />
                        </button>
                  </div>
                  <div>
                        <span>{dislikes}</span>
                        <button
                              style={{ margin: '3px', border: '0px' }}
                              name="dislikes"
                              onClick={handleDislikeClick}
                        >
                              <AiTwotoneDislike />
                        </button>
                  </div>
            </div>
      )
}
