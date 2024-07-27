const playlists = [{id: 1, name: "playlist1", tags:['raggae', 'vibes'], musics:[{title:'waiting in vain', ano: 1999, artist: 'bob marley', album: 'Exodys'}]},
    {id: 2, name: "playlist2", tags:['rock'], musics:[{title:'music2', ano: 1999, artist: 'artist2', album: 'album2'}]},
    {id: 3, name: "playlist3", tags:['raggae', 'vibes'], musics:[{title:'music3', ano: 1999, artist: 'artist3', album: 'album3'}]},
    {id: 4, name: "playlist4", tags:['raggae', 'vibes'], musics:[{title:'music4', ano: 1999, artist: 'artist4', album: 'album4'}]}
]

module.exports = {
    //GET/Playlists
    getAllPlaylists: (req, res)=>{
        console.log(playlists[1].musics[0].title)
        res.json(playlists)
    },
    //GET/playlists/:id
    getPlaylistById: (req, res)=>{
        const {id} = req.params
        const playlist = playlists.find(playlist => playlist.id === +id)
        if(!playlist){
            return res.status(404).json({message: 'Playlist not found!'})
        }
        res.status(200).json(playlist)
    },
    //POST/playlists
    insertPlaylist: (req, res)=>{
        const {name, tags, musics} = req.body
        const newPlaylist = {
            id: Math.floor(Math.random()*99999),
            name,
            tags,
            musics
        }
        playlists.push(newPlaylist)
        res.status(201).json(newPlaylist)
    },
    //POST/playlist/:id/music
    insertMusic:(req,res)=>{
        const {id} = req.params
        const {music} = req.body
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
        if(playlistIndex === -1){
            return res.status(404).json({message: 'Playlist not found!'})
        }
        if(Array.isArray(music)){
            music.forEach(musicElement => {
                playlists[playlistIndex].musics.push(musicElement)
            });
        }else{
            playlists[playlistIndex].musics.push(music)
        }
        res.status(200).json(playlists[playlistIndex])
    },
    //PUT/playlists/:id
    updateData: (req, res)=>{
        const {id} = req.params
        const {name, tags} = req.body
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
        if(playlistIndex === -1){
            return res.status(404).json({message: 'Playlist not found!'})
        }
        if(typeof name !== 'string' && typeof name !== 'undefined'){
            return res.status(400).json({message: 'Invalid Type'})
        }
        if(typeof name === 'string'){
            playlists[playlistIndex].name = name
        }
        if(!Array.isArray(tags) && typeof tags !== 'undefined'){
            return res.status(400).json({message: 'Invalid Type'})
        }
        if(Array.isArray(tags)){
            tags.forEach(tag => {
                playlists[playlistIndex].tags.push(tag)
            });
        } 
        res.status(200).json(playlists[playlistIndex])
    },
    //DELETE/playlists/:id
    deletePlaylist: (req, res)=>{
        const {id} = req.params
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
        if(playlistIndex === -1){
            return res.status(404).json({message: 'Playlist not found!'})
        }
        playlists.splice(playlistIndex, 1)
        res.status(204).end()
    },
    //DELETE/playlists/:id/musics/:title
    deleteMusicFromPlaylist: (req, res)=>{
        const {id, title} = req.params
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
        const musicas = playlists[playlistIndex].musics.forEach(music => {
            musicas.push(music)
        });
        if(playlistIndex === -1){
            return res.status(404).json({message: 'Playlist not found!'})
        }
        if(musicas.findIndex(findMusic => findMusic.title === -1)){
            return res.status(400).json({message: 'Invalid title'})
        }
        playlists[playlistIndex].musics = playlists[playlistIndex].musics.filter(titleFilter => titleFilter !== title)
        res.status(200).json(playlists[playlistIndex])
    }

}

