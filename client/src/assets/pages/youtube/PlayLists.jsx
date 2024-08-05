import React from 'react'
import PlayListContent from './PlayListContent';
import { Link } from 'react-router-dom';

const playlists =[
    {
        title:'Strivers dsa playlist',
        no:1,
        id:'PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz'
    },
    {
        title:'Complete java Dsa By Apna College',
        no:2,
        id:'PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop'
    }
]

const PlayLists = () => {

  return (
    <div>
      {playlists.map((playlist,index)=>(
        <div key={index}>
            <Link to={`/playlist/${playlist.id}`}>
            <h1>{playlist.no}</h1>
            <h1>{playlist.title}</h1>
            </Link>
        </div>
      ))}
    </div>
  )
}

export default PlayLists
