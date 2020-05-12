import React, { useContext } from 'react'
import { ThemeContext } from '../contexts'
import { Link } from 'react-navi'
import FooterBar from '../pages/FooterBar'

function Post ({ id, title, content, author, short = false }) {
    let processedContent = content
    if (short) {
      if (content.length > 30) {
        processedContent = content.substring(0, 30) + '...'
      }
    }

  const { secondaryColor } = useContext(ThemeContext)
  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{processedContent}</div>
      {short &&
        <div>
          <br />
          <Link href={`/view/${id}`}>View full post</Link>
        </div>
      }
      <br />
      <i>Written by <b>{author}</b></i>
      <FooterBar />
    </div>
  )
}

export default React.memo(Post)
