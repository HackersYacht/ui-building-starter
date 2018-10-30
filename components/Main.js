import React, {Component} from 'react'
import {
  Text, View, TextInput, StyleSheet, Image,
  ActivityIndicator, FlatList
} from 'react-native'

import axios from 'axios'

export default class Main extends Component{
  state={
    searching: false,
    artist: '',
    tracks: []
  }

  search  = (artist)=>{
    this.setState({artist, searching:true})
  }

  getArtist = ()=>{
    let {artist}= this.state
    //alert(artist)
    var api1= 'http://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback&quorum_factor=1&'
    var apikey = 'apikey=0298623f90e69244737105d190f71df6'
    var req = `${api1}q_artist=${artist}&page_size=10&page=1&${apikey}`

    axios.get(req)
      .then((res)=>{
        //alert(typeof(res.data.message.body.track_list))
        var tracks= []
        for (let i in res.data.message.body.track_list){
          //alert(i)
          tracks.push(res.data.message.body.track_list[i])
        }
        this.setState({tracks, searching:false})
        //alert(tracks[i].track.track_name)
      })
      .catch((err)=>{
        alert(err)
      })
  }

  render(){
    const {tracks} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            autofocus
            placeholder='Search artist'
            onChangeText={this.search}
            onSubmitEditing={this.getArtist}
          />
        </View>
        <View style={styles.body}>

          <FlatList
            data={tracks}
            renderItem={(item)=>(
              <View>
                <Text>{item.track.track_name}</Text>
              </View>
            )}
          />

          {this.state.searching?(
            <ActivityIndicator size='large' color='#0000ff' />
          ):(
            <View>
              <Text style={styles.txt1}>
                Enjoy the taste of music
              </Text>
              <Image
                style={styles.img}
                source={{uri: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Music-icon.png'}}
              />
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles=  StyleSheet.create({
  container: {
    flex: 1
  },
  inputView:{
    flex:2,
    marginTop: 5,
    padding: 10
  },
  body: {
    flex:9,
    paddingHorizontal: 10
  },
  input: {
    top: 6,
    paddingLeft: 10,
    borderBottomWidth:0.2,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 7,
    elevation: 5,
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  txt1:{
    alignSelf: 'center',
    fontSize: 16
  }
})
