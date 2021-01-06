import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Post.css'

function Post({username,caption,imageUrl}) {
    return (
        <div className="Post">
            <div className="postHeader">
                <Avatar
                className="postAvatar"
                src='static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt={username}
                />
            <h3>{username}</h3>
            </div>

            <img className='postImage' src={imageUrl} alt='media'/>
            <h4 className='postText'><strong>{username}</strong>{` ${caption}`}</h4>
            
        </div>
    )
}

export default Post
