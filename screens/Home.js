import React, {Component, component} from "react";
import {View, Text, Stylesheet, Image, TouchableOpacity}  from "react-native";
import {Header, AirbnbRating, Icon} from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize";
import axios from "axios";
import { render } from "react-dom";

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {}
        movieDetails : {}
    };

}
 ComponentDidMount(){
     this.getMovie();
     
 }

 timeConvert(num){
     var hours = Math.floor(num/60);
     var minutes = num % 60;
     
     return `${hours} hrs ${minutes} mins`;
     
 }
getMovie = () => {
    const url = "https://localhost:5000/get-movie";
    axios.get(url)
    .then(response => {
        let details = response.data.data;
        details["duration"] = this.timeConvert(details.duration);
        this.setState({movieDetails:details});
        
    }) 
    .catch(error =>{
        console.log(error.message);
    
    });
};

likedMovie = () => {
    const url = "https://localhost:5000/liked-movie";
    axios
    .post(url)
    .then(response => {
        this.getMovie();
        
    })
    .catch(error =>{
        console.log(error.message);

    });
};

unlikedMovie = () => {
    const url = "https://localhost:5000/unliked-movie";
axios
.post(url)
.then(response => {
    this.getMovie();

})
.catch(error =>{
    console.log(error.message);

});
};

render() {
    const {movieDetails} = this.state;
    if (movieDetails.poster_link){
        const{
            poster_link,
            title,
            release_data,
            duration,
            overview,
            rating,
            
        } = movieDetails;
        return(
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <Header
                        centercomponent = {{
                            text:"movie Recommended",
                        style : styles.headerTitle
                        }}
                       rightComponent = {{
                         icon : "search",
                         color: "#fff" , 
                       }}
                       backgroundcolor = {"#d500f9"}
                       containerStyle = {{flex:1}}
                       />
                    
                </View>
                <View style = {styles.subContainer}>
                    <View style = {styles.subTopContainer}>
                        <Image style = {styles.posterImage} source = {{uri:poster_link}}/>

                    </View>

                    <View style = {styles.subBottomContainer}>
                        <View style = {styles.upperBottomContainer}>
                            
                        </View>
                        
                    </View>
                    </View>>
                </View>
        )
    }
}