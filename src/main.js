import React, {Component} from 'react';
import {View, Picker, Text,StyleSheet,Image,Button, TouchableOpacity, TextInput, AsyncStorage, TouchableHighlight, ScrollView, FlatList,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import GridView from 'react-native-super-grid';
import * as Progress from 'react-native-progress';
import mock from './mock.js';
import styles from './css';
import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({

 en:{
   back:"Back",
   select:"SELECT",
   food:"FOOD",
   plastic:"PLASTIC",
   paper:"PAPER",
   glass: "GLASS",
   others: "OTHERS",
   clear: "Clear",
   confirm: "CONFIRM",
   done: "DONE",
   name: "Name",
   gender: "Gender",
   rank: "Rank",
   age: "Age",
   hazardous: "Hazardous",
   recycle: "Recycle",
   compostable: "Compostable",
   general: "General",
   pieces: "Pieces",
   total: "Total your trashes",
   userStat: "All users' stat",
   age: "Age",
   male: "Male",
   female: "Female",
   start: "Let's start",
   errInt: "Age must be integer!",
   errInput: "Please input every data",
   goTrash: "GO TRASH",
   general: "General waste",
   generalType: "General waste Type",
   general1: "General waste , material must be free of any actual or apparent contamination (pathological/infectious, radioactive and/ or hazardous chemical). In some cases, after disinfection or decontamination, previously contaminated material may be treated as general waste.",
   general4: "1. Incineration method of waste management:",
   general5: "This simply means burning waste. This method is common in countries with limited landfill space. Incineration chambers can be small for domestic use, but there are large ones for municipal use as well. It is great for treating waste with contamination (like those from hospitals) and hazardous waste from factories, but the method produces too much carbon dioxide. Modern incineration processes are more efficient and release less dioxin than home fireplaces and backyard barbecues. This method is very common in Denmark, Germany and the Netherlands. This method is effective, but expensive.",
   general6: "2. Sanitary Landfills as waste disposal:",
   general7: "Generally, this term means a large piece of land away from living places where all the waste from a town is deposited. But there is more to landfills. Proper landfill management involves sorting out all the waste (waste separation), and sending only the waste that cannot be recycled and composted to the site.",
   general8: "Proper landfills, are also lined at the bottom to minimize the leakage of soil pollutants and other toxins from getting into the water table. This method is effective, but expensive and difficult.",
   general9: "In many towns, sorting is not done, and all the waste (paper, food, diapers, glass) is mixed up and deposited. That is a problem because, glass, and plastics take thousands of years to decompose. Additionally, the landfills soon become full, smelly and unsafe for the environment.",
   

 },
 th: {
   back:"กลับ",
   select:"เลือกขยะ",
   food:"อาหาร",
   plastic:"พลาสติก",
   paper:"กระดาษ",
   glass: "แก้ว",
   others: "อื่นๆ",
   clear: "ล้าง",
   confirm: "ยืนยัน",
   done: "เสร็จสิ้น",
   name: "ชื่อ",
   gender: "เพศ",
   rank: "อันดับ",
   age: "อายุ",
   hazardous: "ขยะอันตราย",
   recycle: "ขยะรีไซเคิล",
   compostable: "ขยะเปียก",
   general: "ขยะทั่วไป",
   pieces: "ชิ้น",
   total: "จำนวนขยะทั้งหมด",
   userStat: "สถิติของผู้ใช้",
   age: "อายุ",
   male: "เพศชาย",
   female: "เพศหญิง",
   start: "เริ่มกันเลย",
   errInt: "กรุณากรอกตัวเลข!",
   errInput: "กรุณากรอกทุกช่อง",
   goTrash: "ทิ้งขยะ",
   general: "ขยะมูลฝอย",
   generalType: "ถังขยะสีน้ำเงิน",
   general1: "ถังขยะสีน้ำเงิน (General waste)  ใช้สำหรับรองรับขยะมูลฝอยทั่วไปที่ย่อยสลายไม่ได้ ไม่คุ้มค่าต่อการรีไซเคิล แต่ไม่เป็นพิษ เช่น พลาสติกห่อลูกอม ซองบะหมี่สำเร็จรูป ถุงพลาสติก โฟมและฟอล์ยที่เปื้อนอาหาร  ขยะประเภทนี้สามารถนำไปทำเชื้อเพลิงและสิ่งประดิษฐ์ต่างๆเทคโนโลยีการกำจัดขยะมูลฝอย",
   general4: "๑.การแปรสภาพและการใช้ประโยชน์จากขยะมูลฝอย:",
   general5: "การนำวัสดุเหลือใช้จากขยะมูลฝอยกลับมาใช้ให้เป็นประโยชน์ จะช่วยลดปริมาณขยะมูลฝอยที่จะต้องกำจัด ในขณะเดียวกันก็เป็นการสงวนทรัพยากรธรรมชาติไว้ได้อีกส่วนหนึ่ง ด้วยการใช้ประโยชน์จากสิ่งเหลือใช้ อาจใช้วิธีหมุนเวียนวัสดุ หรือแปรสภาพขยะมูลฝอยให้เป็นพลังงาน",
   general6: "๒. การคัดแยกวัสดุเพื่อนำกลับมาใช้ :",
   general7: "วัสดุหลายอย่างในขยะมูลฝอยที่อาจนำกลับมาใช้ประโยชน์ได้อีก เช่น กระดาษ แก้ว ขวด พลาสติก เหล็กและโลหะอื่นๆ การคัดเลือกวัสดุต่างๆ ที่รวมอยู่ในขยะมูลฝอย เพื่อนำกลับไปใช้ให้เป็นประโยชน์ได้อีก นับได้ว่า มีการปฏิบัติกันมาช้านาน จะเห็นได้ว่า ตามกองขยะมูลฝอยทุกแห่ง มีบุคคลกลุ่มหนึ่งไปคอยคุ้ยเขี่ยเก็บวัสดุจากกองขยะมูลฝอยตลอดเวลา เพื่อหารายได้ ",
   general8: "Proper landfills, are also lined at the bottom to minimize the leakage of soil pollutants and other toxins from getting into the water table. This method is effective, but expensive and difficult.",
   general9: "In many towns, sorting is not done, and all the waste (paper, food, diapers, glass) is mixed up and deposited. That is a problem because, glass, and plastics take thousands of years to decompose. Additionally, the landfills soon become full, smelly and unsafe for the environment.",
  
  }
});

const STORAGE_KEY= '@uTrash:data'
const STORAGE_BIN4= '@uTrash:key'
const STORAGE_BIN3= '@uTrash:key1'
const STORAGE_BIN2= '@uTrash:key2'
const STORAGE_BIN1= '@uTrash:key3'
const STORAGE_CAT1= '@uTrash:key4'
const STORAGE_CAT2= '@uTrash:key5'
const STORAGE_CAT3= '@uTrash:key6'
const STORAGE_CAT4= '@uTrash:key7'
const STORAGE_CAT5= '@uTrash:key8'
class IntroScreen extends React.Component {
    componentDidMount(){
    AsyncStorage.getItem(STORAGE_KEY)
    .then((value)=> {
      if(value!=null){
           this.timeoutHandle = setTimeout(()=>{
              const { navigate } = this.props.navigation;
              navigate('Home');
         }, 2500);
      }
      else{
           this.timeoutHandle = setTimeout(()=>{
              const { navigate } = this.props.navigation;
              navigate('Login');
         }, 2500);
      }
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))
         // Start counting when the page is loaded
    }

    componentWillUnmount(){
         clearTimeout(this.timeoutHandle); 
    }

  render() {
  
    return (
        <View style={{      flex:1,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',}}>
        <Image
          style={{  
          height:'50%',
          width:'50%'}}
          source={require('../img/logo.png')}
        />
        </View>
    );
  }
}

///////////////////////////////Login///////////////////////////////////

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name:'' ,
      age:'',
      gender: strings.male,
      errorMsg:'',
      bin1:0,
      bin2:0,
      bin3:0,
      bin4:0,
      trashNum:0,
    };
  }

  start(){
    if(this.state.name!=''&&this.state.age!=''){
      if(isNaN(this.state.age)){
        this.setState({
            errorMsg: strings.errInt,
        })
        
      }
      else{
          const { navigate } = this.props.navigation;
          navigate('Home');
      }
    }
    else{
      this.setState({
        errorMsg: strings.errInput,
      })
    }
    this.saveUser();
  }

  saveUser(){
    let userData = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      bin1: this.state.bin1,
      bin2: this.state.bin2,
      bin3: this.state.bin3,
      bin4: this.state.bin4,
      trashNum: this.state.trashNum,
    };
    AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(userData))
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();
  }

  render() {
 
    return (
      <Image style={styles._IMGcontainer} source={require('../img/garbage.jpg')}>
      <View style={styles._subBgLogin}>
        <View style={styles._centerScreen}>
          <Image style={{height:'30%', width:'30%'}} source={require('../img/intro2.png')}/>
          
          <TextInput
            placeholder= {strings.name}
            placeholderTextColor="#757575"
            style={styles._input}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          
           <TextInput
            type='number'
            placeholder= {strings.age}
            placeholderTextColor="#757575"
            keyboardType="numeric"
            style={styles._input}
            onChangeText={(age) => this.setState({age})}
            value={this.state.age}
          /> 

          <Picker
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
            style={styles._input}>
            <Picker.Item label={strings.male} value={strings.male}/>
            <Picker.Item label={strings.female} value={strings.female} />
          </Picker>

          <Text style={styles._errorMsg}>{this.state.errorMsg}</Text>

          <TouchableOpacity style={styles._loginButton} onPress={() => this.start()}>
            <Text style={styles._loginText}>{strings.start}</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Image>
  
    );
  }
}


///////////////////////////////Home///////////////////////////////////

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name:'' ,
      age:'',
      gender:'',
      lang: true,
      bin1:0,
      bin2:0,
      bin3:0,
      bin4:0,
      trashNum:0,
      bar1:0,
      bar2:0,
      bar3:0,
      bar4:0,
      pic:0,
    };
  //  this.initapp();
  //  this.showTeam();
  }
  
  componentDidMount(){
    AsyncStorage.getItem(STORAGE_KEY)
    .then((value)=> {
      pullJson= JSON.parse(value);
      console.log(value);
      this.setState({
        name: pullJson.name,
        gender: pullJson.gender,
        age: pullJson.age
      })
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN4)
    .then((value)=> {
      this.setState({
        bin4:  value,
      })
      console.log('Home>>>>>>'+this.state.bin4);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN3)
    .then((value)=> {
      this.setState({
        bin3:  value,
      })
      console.log('Home>>>>>>'+this.state.bin3);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN2)
    .then((value)=> {
      this.setState({
        bin2:  value,
      })
      console.log('Home>>>>>>'+this.state.bin2);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN1)
    .then((value)=> {
      this.setState({
        bin1:  value,
      })
      console.log('Home>>>>>>'+this.state.bin1);
       let summation = parseInt(this.state.bin1,10)+parseInt(this.state.bin2,10)+parseInt(this.state.bin3,10)+parseInt(this.state.bin4,10);
        this.setState({trashNum:summation})

        if(this.state.bin1!==null){
        let sum1 = ((parseInt(this.state.bin1,10)*100)/this.state.trashNum)/100;
        sum1 = parseFloat(sum1.toFixed(1));
        this.setState({bar1 : sum1})
        }
      else{ this.setState({bar1 :0})}
  
      if(this.state.bin2!==null){
        let sum2 = ((parseInt(this.state.bin2,10)*100)/this.state.trashNum)/100;
        sum2 = parseFloat(sum2.toFixed(1));
        this.setState({bar2 : sum2})
      }
      else{ this.setState({bar2 :0})}

      if(this.state.bin3!==null){
        let sum3 = ((parseInt(this.state.bin3,10)*100)/this.state.trashNum)/100;
        sum3 = parseFloat(sum3.toFixed(1));
        this.setState({bar3 : sum3})
      }
      else{ this.setState({bar3 :0})}
      if(this.state.bin4!==null){
        let sum4 = ((parseInt(this.state.bin4,10)*100)/this.state.trashNum)/100;
        sum4 = parseFloat(sum4.toFixed(1));
        this.setState({bar4 : sum4})
      }
        else{ this.setState({bar4 :0})}
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

  
  
  }

  changLang(){
    if(strings.getLanguage()=="en"){
      strings.setLanguage("th")
      this.setState({})
    }
    else {
      strings.setLanguage("en")
      this.setState({})
    }
    this.setState({
      lang: !this.state.lang
    })
  }

  signout(){
    const { navigate } = this.props.navigation;
    navigate('Login');
  }

  showTeam(){

  }

  showgraph(){

  }

  render() {
  var proPic = this.state.gender=='Male' ? require('../img/person1.png') : require('../img/person2.png');
  // if(this.state.pic==1){var teamPic=require('../img/team1.png')}
  // if(this.state.pic==2){var teamPic=require('../img/team2.png')}
  // if(this.state.pic==3){var teamPic=require('../img/team3.png')}
  // if(this.state.pic==4){var teamPic=require('../img/team4.png')}
  // if(this.state.pic==0){var teamPic=require('../img/team.png')}
       if(parseInt(this.state.bin1,10)>parseInt(this.state.bin2,10)&&parseInt(this.state.bin1,10)>parseInt(this.state.bin3,10)&&parseInt(this.state.bin1,10)>parseInt(this.state.bin4,10)){
      var teamPic=require('../img/team1.png')
      var teamUrl='Fourth'
     }
     else if(parseInt(this.state.bin2,10)>parseInt(this.state.bin1,10)&&parseInt(this.state.bin2,10)>parseInt(this.state.bin3,10)&&parseInt(this.state.bin2,10)>parseInt(this.state.bin4,10)){
      var teamPic=require('../img/team2.png')
      var teamUrl='Third'
     }
     else if(parseInt(this.state.bin3,10)>parseInt(this.state.bin1,10)&&parseInt(this.state.bin3,10)>parseInt(this.state.bin2,10)&&parseInt(this.state.bin3,10)>parseInt(this.state.bin4,10)){
     var teamPic=require('../img/team3.png')
     var teamUrl='Second'
     }
      else if(parseInt(this.state.bin4,10)>parseInt(this.state.bin1,10)&&parseInt(this.state.bin4,10)>parseInt(this.state.bin3,10)&&parseInt(this.state.bin4,10)>parseInt(this.state.bin2,10)){
     var teamPic=require('../img/team4.png')
     var teamUrl='First'
     }
    else{
     var teamPic=require('../img/team.png')
     var teamUrl=''
    }
  const { navigate } = this.props.navigation;
    return (
      <View style={styles._container}>
        <View style={styles._header}>
          <View style={styles._subHead2}>
             <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
             onPress={() => this.signout()}>  
              <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/signout.png')}/>
             </TouchableHighlight> 
          </View>
          <View style={styles._subHead1}>
            <Text style={styles._headText}>uTrash</Text>
          </View>
          <View style={styles._subHead2}>
            <TouchableOpacity style={styles._langButton} onPress={() => this.changLang()}>
              <Text style={styles._langText}>{this.state.lang ? 'TH':'EN'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles._console}>
          <Image style={styles._IMGcontainer} source={require('../img/console1.png')}>
            <View style={styles._centerConsole}>
              <Image style={{height:'65%', width:'30%', resizeMode:'contain'}} source={proPic}/>
              <Text style={styles._subText}>{strings.name}</Text>
              <Text style={styles._mainText}>{this.state.name}</Text>
            </View>
          </Image>
        </View>
        <View style={styles._console2}>
          <View style={styles._containerRow}>
            <View style={styles._egde}>
            </View>
            <View style={styles._subConsole2}>
              <Text style={styles._subText2}>{strings.gender}</Text>
              <Text style={styles._mainText2}>{this.state.gender}</Text>
            </View>
            <View style={styles._subConsole2}>
              <Text style={styles._subText2}>{strings.rank}</Text>
              <Text style={styles._mainText2}>Beginner</Text>
            </View>
            <View style={styles._subConsole2}>
              <Text style={styles._subText2}>{strings.age}</Text>
              <Text style={styles._mainText2}>{this.state.age}</Text>
            </View>
            <View style={styles._egde}>
            </View>
          </View>
        </View>
        <View style={styles._team}>
          <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
             onPress={() => navigate(teamUrl)}> 
          <Image style={{height:'100%', width:'100%',resizeMode: 'stretch'}} source={teamPic}/>
          </TouchableHighlight>
        </View>
        <View style={styles._body}>
          <View style={{width:'80%'}}>
          <Text style={{color:'#616161'}}>{strings.hazardous}: {this.state.bin1} {strings.pieces}</Text>
             <Progress.Bar 
            progress={this.state.bar1} 
            width={null}
            height={10}
            color={'rgba(198, 40, 40, 1)'}
          />   
           <Text style={{marginTop:'1%',color:'#616161'}}>{strings.recycle}: {this.state.bin2} {strings.pieces}</Text>
          <Progress.Bar 
            progress={this.state.bar2} 
            width={null}
            height={10}
            color={'rgba(249, 168, 37, 1)'}
          />
          <Text style={{marginTop:'1%',color:'#616161'}}>{strings.compostable}: {this.state.bin3} {strings.pieces}</Text>
          <Progress.Bar 
            progress={this.state.bar3} 
            width={null}
            height={10}
            color={'rgba(46, 125, 50, 1)'}
          />
          <Text style={{marginTop:'1%',color:'#616161'}}>{strings.general}: {this.state.bin4} {strings.pieces}</Text>
          <Progress.Bar 
            progress={this.state.bar4} 
            width={null}
            height={10}
            color={'rgba(21, 101, 192, 1)'}
          /> 
           <Text style={{textAlign:'right',color:'black'}}>{strings.total} : {this.state.trashNum}</Text> 
          </View>
        </View>
        <View style={styles._footer}>
          <View style={styles._subHead2}>
            <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
             onPress={() => navigate('Stat')}>  
              <Image style={{height:'30%', width:'55%',resizeMode: 'contain'}} source={require('../img/meter.png')}/>
            </TouchableHighlight>
          </View>
          <View style={styles._subHead1}>
            <TouchableOpacity style={styles._trashButton} onPress = {() => navigate('Task')}>
              <Text style={styles._trashText}>{strings.goTrash}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles._subHead2}>
          </View>
        </View>
      </View>
      
    );
  }
}
//////////////////////////////Stat//////////////////////////////////////////

class StatScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
      pie1:0,
      pie2:0,
      pie3:0,
      pie4:0,
      sum:0,
      test1:0,
      percen:100,
      result1: 0,
      result2: 0,
      result3: 0,
      result4: 0,
    };
    this._run();
   
  }

  componentWillMount() {
    
  }

  _run(){
   
    fetch('http://smartbin.devfunction.com/api/?team_id=5&secret=yR4PzR')
        .then((response) => response.json())
        .then((responseJSON)=>{
            console.log(responseJSON);
            this.setState({
              pie1:Number.parseInt(responseJSON.data.bin_statistics.hazardous,10),
              pie2:Number.parseInt(responseJSON.data.bin_statistics.recycle,10),
              pie3:Number.parseInt(responseJSON.data.bin_statistics.compostable,10),
              pie4:Number.parseInt(responseJSON.data.bin_statistics.general,10),
              
            });
             let test =((this.state.pie1*this.state.percen)/(this.state.pie1+this.state.pie2+this.state.pie3+this.state.pie4))/this.state.percen
             test = parseFloat(test.toFixed(2));
             let test2 =((this.state.pie2*this.state.percen)/(this.state.pie1+this.state.pie2+this.state.pie3+this.state.pie4))/this.state.percen
             test2 = parseFloat(test2.toFixed(2));
             let test3 =((this.state.pie3*this.state.percen)/(this.state.pie1+this.state.pie2+this.state.pie3+this.state.pie4))/this.state.percen
             test3 = parseFloat(test3.toFixed(2));
             let test4 =((this.state.pie4*this.state.percen)/(this.state.pie1+this.state.pie2+this.state.pie3+this.state.pie4))/this.state.percen
             test4 = parseFloat(test4.toFixed(2));


             this.setState({result1 : test,
            result2 : test2,
            result3 : test3,
            result4 : test4
            })
        })
        .catch((error)=>{
            console.warn(error);
        });
      

}


render() {
  const { navigate } = this.props.navigation;
  // var numred = Number.parseInt(this.state.pie1,10);
  // var numyellow = Number.parseInt(this.state.pie2,10);
  // var numgreen = Number.parseInt(this.state.pie3,10);
  // var numblue = Number.parseInt(this.state.pie4,10);
  // var sum =numred+numblue+numyellow+numgreen;
 console.log(this.state.pie1)
  test2= 65*this.state.percen/this.state.pie1;
  return (
        <View style={styles._container}>
        <View style={styles._header}>
          <View style={styles._subHead2}>
            <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
                  onPress={() => navigate('Home')}>  
                    <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/arrow.png')}/>
                  </TouchableHighlight> 
          </View>
          <View style={styles._subHead1}>
            <Text style={styles._headText}>{strings.userStat}</Text>
          </View>
          <View style={styles._subHead2}>
          </View>
        </View>
        <View style={styles._teamPage}>
          <View style={{flex:1,flexDirection: 'row',}}>
            <View style={styles._stat1}>
              <Text>{strings.hazardous}</Text>
              <Text>{this.state.result1*100}%</Text>
              <Progress.Pie 
                progress={this.state.result1} size={100} 
                color={'rgba(0, 0, 0, 1)'}
                borderWidth={3}
              />
              <Text>{this.state.pie1}</Text>
              <Text>pieces</Text>
            </View>
            <View style={styles._stat2}>
              <Text>{strings.recycle}</Text>
              <Text>{this.state.result2*100}%</Text>
              <Progress.Pie 
                progress={this.state.result2} size={100} 
                color={'rgba(0, 0, 0, 1)'}
                borderWidth={3}
              />
              <Text>{this.state.pie2}</Text>
              <Text>pieces</Text>
            </View>
          </View>
            
            <View style={{flex:1,flexDirection: 'row',}}>
              <View style={styles._stat3}>
                <Text>{strings.compostable}</Text>
                <Text>{this.state.result3*100}%</Text>
                <Progress.Pie 
                progress={this.state.result3} size={100} 
                color={'rgba(0, 0, 0, 1)'}
                borderWidth={3}
              />
              <Text>{this.state.pie3}</Text>
              <Text>pieces</Text>
              </View>
              <View style={styles._stat4}>
                 <Text>{strings.general}</Text>
                <Text>{this.state.result4*100}%</Text>
                <Progress.Pie 
                progress={this.state.result4} size={100} 
                color={'rgba(0, 0, 0, 1)'}
                borderWidth={3}
              />
              <Text>{this.state.pie4}</Text>
              <Text>pieces</Text>
             </View>
            </View>
        </View>
      </View>
    )
}
}

///////////////////////////////Mark/////////////////////////////////////////
class LastScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
      bin1:0,
      bin2:0,
      bin3:0,
      bin4:0,
      cat1:0,
      cat2:0,
      cat3:0,
      cat4:0,
      cat5:0,
      // nowbin1:0,
      // nowbin2:0,
      // nowbin3:0,
      // nowbin4:0,
    };
  }

  componentWillMount(){
   AsyncStorage.getItem(STORAGE_BIN4)
    .then((value)=> {
      this.setState({
        bin4: (value==null) ? 0 : value,
      })
      console.log('>>bin4>>'+this.state.bin4);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN3)
    .then((value)=> {
      this.setState({
        bin3: (value==null) ? 0 : value,
      })
      console.log('>>bin3>>'+this.state.bin3);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN2)
    .then((value)=> {
      this.setState({
        bin2: (value==null) ? 0 : value,
      })
      console.log('>>bin2>>'+this.state.bin2);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

    AsyncStorage.getItem(STORAGE_BIN1)
    .then((value)=> {
      this.setState({
        bin1: (value==null) ? 0 : value,
      })
      console.log('>>bin1>>'+this.state.bin1);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))


  }

  runBlue(itemList) {
  
    var x=parseInt(this.state.bin4,10)
    var blue = []
    var category=[]
    for( let i = 0; i< itemList.length; i++) {
      if(itemList[i].bin == "blue"){
        blue.push(
          itemList[i]
        )
        x=x+1
      }
      if(itemList[i].type == "others"){
        category.push(
          itemList[i]
        )
      }

    }
    

    AsyncStorage.setItem(STORAGE_BIN4,x+'')
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();

    AsyncStorage.setItem(STORAGE_CAT1,category.length+'')
    .then(()=>console.log('save cat1'))
    .catch((error)=> console.log(error.message)).done();

    return blue.map(item =>
            <View key={item.id}>
                <Image source={item.icon} style={{width: 40, height: 40}} />
            </View>
        )

  }

    runGreen(itemList) {
      var x=parseInt(this.state.bin3,10)
      var green = []
      var category=[]

      for( let i = 0; i< itemList.length; i++) {
        if(itemList[i].bin == "green"){
          green.push(
            itemList[i]
          )
          x=x+1
        }
        if(itemList[i].type == "food"){
          category.push(
          itemList[i]
        )
      }
      }

    AsyncStorage.setItem(STORAGE_BIN3,x+'')
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();

    AsyncStorage.setItem(STORAGE_CAT2,category.length+'')
    .then(()=>console.log('save cat2'))
    .catch((error)=> console.log(error.message)).done();


      return green.map(item =>
              <View key={item.id}>
                  <Image source={item.icon} style={{width: 40, height: 40}} />
              </View>
          )

    }

    runRed(itemList) {
      var x=parseInt(this.state.bin1,10)
      var red = []
      var category=[]

      for( let i = 0; i< itemList.length; i++) {
        if(itemList[i].bin == "red"){
          red.push(
            itemList[i]
          )
          x=x+1
        }
        if(itemList[i].type == "paper"){
          category.push(
          itemList[i]
        )
      }
      }

      AsyncStorage.setItem(STORAGE_BIN1,x+'')
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();

      AsyncStorage.setItem(STORAGE_CAT3,category.length+'')
    .then(()=>console.log('save cat3'))
    .catch((error)=> console.log(error.message)).done();


      return red.map(item =>
              <View key={item.id}>
                  <Image source={item.icon} style={{width: 40, height: 40}} />
              </View>
          )

   }

   runYellow(itemList) {
       var x=parseInt(this.state.bin2,10)
      var yellow = []
var category=[]
var category1=[]
      for( let i = 0; i< itemList.length; i++) {
        if(itemList[i].bin == "yellow"){
          yellow.push(
            itemList[i]
          )
          x=x+1
        }
            if(itemList[i].type == "plastic"){
        category.push(
          itemList[i]
        )
      }

      if(itemList[i].type == "glass"){
        category1.push(
          itemList[i]
        )
      }

      }

AsyncStorage.setItem(STORAGE_BIN2,x+'')
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();

    AsyncStorage.setItem(STORAGE_CAT4,category.length+'')
    .then(()=>console.log('save cat4'))
    .catch((error)=> console.log(error.message)).done();

     AsyncStorage.setItem(STORAGE_CAT5,category1.length+'')
    .then(()=>console.log('save cat5'))
    .catch((error)=> console.log(error.message)).done();


      return yellow.map(item =>
              <View key={item.id}>
                  <Image source={item.icon} style={{width: 40, height: 40}} />
              </View>
          )

   }


   _post() {
    fetch('http://smartbin.devfunction.com/api/', {
      method: 'POST',
      body: JSON.stringify({
        team_id: 5,
        secret: 'yR4PzR',
        waste_statistics: [
          {category: "food", 
          selected: this.state.cat2},
          {category: "plastic", 
          selected: this.state.cat4},
          {category: "paper", 
          selected: this.state.cat3},
          {category: "glass", 
          selected: this.state.cat5},
          {category: "others", 
          selected: this.state.cat1}
        ],
        bin_statistics:  {
          general: this.state.bin1,
          compostable: this.state.bin2,
          recycle: this.state.bin3,
          hazardous: this.state.bin4
        }
      })
    })
   console.log('done'+this.state)
  }




   goHome(){
    AsyncStorage.getItem(STORAGE_CAT1)
    .then((value)=> {
      this.setState({
        cat1: value,
      })
      console.log('>>cat1>>'+this.state.cat1);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

        AsyncStorage.getItem(STORAGE_CAT2)
    .then((value)=> {
      this.setState({
        cat2: value,
      })
      console.log('>>cat2>>'+this.state.cat2);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

        AsyncStorage.getItem(STORAGE_CAT3)
    .then((value)=> {
      this.setState({
        cat3: value,
      })
      console.log('>>cat3>>'+this.state.cat3);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

        AsyncStorage.getItem(STORAGE_CAT4)
    .then((value)=> {
      this.setState({
        cat4: value,
      })
      console.log('>>cat4>>'+this.state.cat4);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

        AsyncStorage.getItem(STORAGE_CAT5)
    .then((value)=> {
      this.setState({
        cat5: value,
      })
      console.log('>>cat5>>'+this.state.cat5);
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))

this.timeoutHandle = setTimeout(()=>{
              this._post();
  const { navigate } = this.props.navigation;
     navigate('Home')
         }, 500);
   }


   



  render() {

    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container} >
        <View style={{flex:15, flexDirection: 'row'}} >

          <View style={[styles.itemOnBin, {borderColor: '#6FB2DC'}]} >

             {this.runBlue(params.items)} 

          </View>
          <View style={[styles.itemOnBin, {borderColor: 'green'}]} >

             {this.runGreen(params.items)} 

          </View>
          <View style={[styles.itemOnBin, {borderColor: '#E04E2D'}]} >

            {this.runRed(params.items)} 

          </View>
          <View style={[styles.itemOnBin, {borderColor: '#DFBE29'}]} >

            {this.runYellow(params.items)} 

          </View>

        </View>
        <View style={{flexDirection: 'row', flex:3}} >
            <Image source={require('../img/blueBin.png')} style={{width: 100, height: 100, flex:1}} />
            <Image source={require('../img/greenBin.png')} style={{width: 100, height: 100, flex:1}} />
            <Image source={require('../img/redBin.png')} style={{width: 100, height: 100, flex:1}} />
            <Image source={require('../img/yellowBin.png')} style={{width: 100, height: 100, flex:1}} />
        </View>
        <View style={styles.buttonBar} >
              <View style={{flex:1, alignItems:'center'}} >
                  <TouchableHighlight style={styles.buttonStyle} 
                  onPress = {() => this.goHome()}>
                    <Text style={styles.buttonText} > {strings.done} </Text>
                  </TouchableHighlight>
              </View>
        </View>
      </View>
    );
  }
}

class TaskScreen extends React.Component {

      state =  {
            itemList: [],
            modalVisible: false,
            food: true,
            plastic: false,
            paper: false,
            glass: false,
            others: false,
        }

    setFood() {
          this.setState({
            food: true,
            plastic: false,
            paper: false,
            glass: false,
            others: false,
          })
        }

    setPlastic() {
      this.setState({
        food: false,
        plastic: true,
        paper: false,
        glass: false,
        others: false,
      })
    }

    setPaper() {
      this.setState({
        food: false,
        plastic: false,
        paper: true,
        glass: false,
        others: false,
      })
    }

    setGlass() {
      this.setState({
        food: false,
        plastic: false,
        paper: false,
        glass: true,
        others: false,
      })
    }

    setOthers() {
      this.setState({
        food: false,
        plastic: false,
        paper: false,
        glass: false,
        others: true,
      })
    }


    runItems(){

      if(this.state.food == true){
        var foods = []

        for(let i=0; i< mock.length; i++){
          if(mock[i].type == "food"){
            foods.push(
              mock[i]
            )
          }
        }

         if(strings.getLanguage()=="en"){
            return foods.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.en} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          } else {
            return foods.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.th} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          }

      } else if(this.state.plastic == true) {

        var plastics = []

        for(let i=0; i< mock.length; i++){
            if(mock[i].type == "plastic"){
              plastics.push(
                mock[i]
              )
            }
          }

          if(strings.getLanguage()=="en"){
            return plastics.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.en} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          } else {
            return plastics.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.th} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          }
        
      } else if(this.state.paper == true) {

        var papers = []

        for(let i=0; i< mock.length; i++){
          if(mock[i].type == "paper"){
            papers.push(
              mock[i]
            )
          }
        }

        if(strings.getLanguage()=="en"){
            return papers.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.en} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          } else {
            return papers.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.th} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          }

      } else if(this.state.glass == true) {
        var glass = []

      for(let i=0; i< mock.length; i++){
        if(mock[i].type == "glass"){
          glass.push(
            mock[i]
          )
        }
      }

         if(strings.getLanguage()=="en"){
            return glass.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.en} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          } else {
            return glass.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.th} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          }

      } else if(this.state.others == true) {
        var others = []

      for(let i=0; i< mock.length; i++){
        if(mock[i].type == "others"){
          others.push(
            mock[i]
          )
        }
      }

        if(strings.getLanguage()=="en"){
            return others.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.en} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          } else {
            return others.map(item =>
                <View key={item.id} style={styles.itemStyle} >
                    <Image source={item.icon} style={{width: 50, height: 50, marginLeft:'5%'}} />
                    <View style={{justifyContent:'center'}} >
                      <Text style={{fontWeight: 'bold'}} >{item.name.th} </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.addToList(item.id)} style={{justifyContent:'center',marginRight:'5%'}} >
                      <Image source={require('../img/add-icon.png')} style={{height:20, width: 20}}/>
                    </TouchableOpacity>
                </View>
            )
          }
      }

    }

    

    addToList(id) {
      for(let i=0; i< mock.length; i++){
        if(mock[i].id == id){
          this.setState({
            itemList:[...this.state.itemList, mock[i]]
          })
        }
      }      

    }

    clearList() {
      this.setState({
            itemList:[]
          })
    }

    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
            <View style={styles.toolbar}>
              <View style={{flex:1}}>
                 <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
                  onPress={() => navigate('Home')}>  
                    <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/arrow.png')}/>
                  </TouchableHighlight> 
              </View>
                <Text style={styles.titleText3} > {strings.select} </Text>
              <View style={{flex:1}}>
              </View>
            </View>
            <View style={styles.toolbar2}>
                <TouchableOpacity onPress={()=> this.setFood() } style={{flex:1,marginVertical:'1.5%',}} >
                  <Text style={styles.titleText2} > {strings.food} </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> this.setPlastic()} style={{flex:1,marginVertical:'1.5%',}}>
                  <Text style={styles.titleText2} >  {strings.plastic}  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setPaper() } style={{flex:1,marginVertical:'1.5%',}}>
                  <Text style={styles.titleText2}  >  {strings.paper}  </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> this.setGlass() } style={{flex:1,marginVertical:'1.5%',}}>
                  <Text style={styles.titleText2} >  {strings.glass}  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setOthers() } style={{flex:1,marginVertical:'1.5%',}} >
                  <Text style={styles.titleText2} >  {strings.others} </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <ScrollView>
                <View style={{marginTop: 20}} >
                  {this.runItems()}
                </View>
              </ScrollView>
            </View>
            <View style={styles.itemBar} >

                <TouchableHighlight onPress={() => this.clearList() }
                  style={{backgroundColor: '#A81511', height: 18, }} >
                  <Text style={{color: 'white'}} > {strings.clear} </Text>
                </TouchableHighlight>

                <GridView
                    itemWidth={40}
                    items={this.state.itemList}
                    enableEmptySections={true}
                    renderItem={item => <Image source={item.icon} style={{width:40, height:40}} />}
                />

            </View>
            <View style={styles.buttonBar} >

              <View style={{flex:1, alignItems:'center'}} >
                  <TouchableHighlight style={styles.buttonStyle}
                  onPress = {() => navigate('Last', {items: this.state.itemList})} >
                    <Text style={styles.buttonText} > {strings.confirm} </Text>
                  </TouchableHighlight>
              </View>

            </View>
            
        </View>
    );
  }
}


class FirstScreen extends React.Component {
render() {
  const { navigate } = this.props.navigation;
    return (
       <View style={styles._container}>
        <View style={styles._header}>
          <View style={styles._subHead2}>
            <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
                  onPress={() => navigate('Home')}>  
                    <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/arrow.png')}/>
                  </TouchableHighlight>
          </View>
          <View style={styles._subHead1}>
            <Text style={styles._headText}>uTrash</Text>
          </View>
          <View style={styles._subHead2}>
          </View>
        </View>
        <View style={styles._teamPage}>
            <View style={{flex:1,flexDirection: 'column',}}>
                    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 24 ,alignSelf:'center', color:'#1565C0',marginBottom:10,}}>ขยะมูลฝอย</Text>
                        <View style={{flex:1,flexDirection: 'column',marginLeft:10,marginRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',}}>ถังขยะสีน้ำเงิน</Text>
                            <Text style={{fontSize: 13 ,color:'#757575'}}>ถังขยะสีน้ำเงิน (General waste)  ใช้สำหรับรองรับขยะมูลฝอยทั่วไปที่ย่อยสลายไม่ได้ ไม่คุ้มค่าต่อการรีไซเคิล แต่ไม่เป็นพิษ เช่น พลาสติกห่อลูกอม ซองบะหมี่สำเร็จรูป ถุงพลาสติก โฟมและฟอล์ยที่เปื้อนอาหาร  ขยะประเภทนี้สามารถนำไปทำเชื้อเพลิงและสิ่งประดิษฐ์ต่างๆเทคโนโลยีการกำจัดขยะมูลฝอย</Text>
                                  <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Ge2.png')}
                                              />
                                <Text style={{fontWeight: 'bold', fontSize: 14 ,paddingTop: 5,color:'#424242',}}>๑.การแปรสภาพและการใช้ประโยชน์จากขยะมูลฝอย</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>การนำวัสดุเหลือใช้จากขยะมูลฝอยกลับมาใช้ให้เป็นประโยชน์ จะช่วยลดปริมาณขยะมูลฝอยที่จะต้องกำจัด ในขณะเดียวกันก็เป็นการสงวนทรัพยากรธรรมชาติไว้ได้อีกส่วนหนึ่ง ด้วยการใช้ประโยชน์จากสิ่งเหลือใช้ อาจใช้วิธีหมุนเวียนวัสดุ หรือแปรสภาพขยะมูลฝอยให้เป็นพลังงาน</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>เราอาจแปรสภาพขยะมูลฝอยเป็นพลังงานได้ ดังนี้คือ</Text>
                                    <View>
                                      <Text style={{fontWeight: 'bold',fontSize: 13 ,color:'#424242',}}>พลังงานความร้อน </Text>
                                      <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ได้จากการนำเอาขยะมูลฝอยส่วนที่เผาไหม้ได้ มาเป็นเชื้อเพลิงสำหรับทำไอน้ำร้อน แล้วส่งไปให้ความอบอุ่นตามอาคารบ้านเรือน เช่นที่ทำอยู่ในประเทศญี่ปุ่น เป็นต้น </Text>
                                    </View>
                                    <View>
                                      <Text style={{fontWeight: 'bold',fontSize: 13 ,color:'#424242',}}>พลังงานไฟฟ้า </Text>
                                      <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ได้จากการนำขยะมูลฝอยไปเป็นเชื้อเพลิง สำหรับผลิตไอน้ำ ไปหมุนเครื่องกำเนิดไฟฟ้า เพื่อผลิตกระแสไฟฟ้า บริการแก่ประชาชน ตัวอย่างเช่น การแปรสภาพของการใช้ประโยชน์จากขยะมูลฝอยในบางรัฐของประเทศสหรัฐอเมริกา ซึ่งมีขยะมูลฝอยจำนวนมาก และเป็นชนิดที่เผาไหม้ได้เป็นส่วนมาก  </Text>
                                    </View>
                                <Text style={{fontWeight: 'bold', fontSize: 14 ,paddingTop: 5,color:'#424242',}}>๒. การคัดแยกวัสดุเพื่อนำกลับมาใช้ </Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>วัสดุหลายอย่างในขยะมูลฝอยที่อาจนำกลับมาใช้ประโยชน์ได้อีก เช่น กระดาษ แก้ว ขวด พลาสติก เหล็กและโลหะอื่นๆ การคัดเลือกวัสดุต่างๆ ที่รวมอยู่ในขยะมูลฝอย เพื่อนำกลับไปใช้ให้เป็นประโยชน์ได้อีก นับได้ว่า มีการปฏิบัติกันมาช้านาน จะเห็นได้ว่า ตามกองขยะมูลฝอยทุกแห่ง มีบุคคลกลุ่มหนึ่งไปคอยคุ้ยเขี่ยเก็บวัสดุจากกองขยะมูลฝอยตลอดเวลา เพื่อหารายได้ </Text>
                                      <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center'}}
                                               source={require('../img/Ge4.png')}
                                              />
                                    <Text style={{fontSize: 13 ,color:'#757575',}}>การเก็บวัสดุจากกองขยะมูลฝอยนั้น อาจจะเกิดผลเสีย คือ</Text>
                                      <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>๑. ปัญหาเกี่ยวกับสุขภาพ และความปลอดภัยของผู้แยกวัสดุจากกองขยะมูลฝอย ที่อาจเป็นอันตราย เนื่องมาจากความสกปรกของขยะมูลฝอย ซึ่งมีได้ทั้งเชื้อโรค และสารพิษ รวมทั้งของมีคม วัตถุระเบิด และสารกัมมันตรังสี เป็นต้น </Text>
                                      <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>๒. ปัญหาจากการที่นำเอาวัสดุที่เก็บมาได้เอามากองรวมๆ กัน เพื่อรอจำหน่ายนั้น ทำให้เกิดกองขยะขึ้นมาอีกส่วนหนึ่ง ซึ่งสกปรกรกรุงรัง เป็นที่อาศัยของสัตว์และแมลงนำโรค เป็นภาพที่น่ารังเกียจ ขาดความเป็นระเบียบเรียบร้อยของพื้นที่ และบริเวณใกล้เคียง </Text>
                                      <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>๓. การนำขยะมูลฝอยไปถมที่ดิน เพื่อปรับปรุงสภาพ ขยะมูลฝอยเกือบทุกชนิดสามารถนำไปใช้สำหรับถมที่ดินที่เป็นหลุมเป็นบ่อ เช่น บ่อดินลูกรังที่น้ำท่วม เหมืองร้าง ฯลฯ ทำให้ที่ดังกล่าวกลายเป็นพื้นที่ราบเรียบ ใช้ประโยชน์ได้มากมายหลายประการ เช่น ทำสนามกีฬา สนามกอล์ฟ สวนสาธารณะ สถานที่พักผ่อนหย่อนใจ แม้กระทั่งสร้างเป็นอาคารที่ทำงาน หรือที่อยู่อาศัย ในต่างประเทศมีการใช้พื้นที่ดินที่เกิดจากการถมด้วยขยะมูลฝอย แบบการฝังกลบ และสามารถนำไปใช้ประโยชน์ได้ </Text>
                                        <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center'}}
                                               source={require('../img/Ge3.png')}
                                              />
                                      <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',paddingTop:10}}>ประเทศไทยก็ได้ใช้ขยะมูลฝอยไปถมที่ทำประโยชน์ เช่น ที่สวนจตุจักร ซึ่งเดิมเป็นที่ลุ่มน้ำท่วม และเต็มไปด้วยพงหญ้ารกมาก และไม่ได้ใช้ประโยชน์แต่อย่างใด ต่อมาได้มีการนำเอาขยะมูลฝอยจากสถานกำจัดขยะดินแดง มาถมที่บริเวณสวนจตุจักร และปรับปรุงเป็นสถานที่พักผ่อนหย่อนใจ ดังที่ปรากฏอยู่ในขณะนี้</Text>
                               
                        </View>
                        </ScrollView>
                </View>

        </View>
      </View>
    )
}
}

class SecondScreen extends React.Component {
render() {
  const { navigate } = this.props.navigation;
    return (
       <View style={styles._container}>
        <View style={styles._header}>
          <View style={styles._subHead2}>
                   <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
                  onPress={() => navigate('Home')}>  
                    <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/arrow.png')}/>
                  </TouchableHighlight>
          </View>
          <View style={styles._subHead1}>
            <Text style={styles._headText}>uTrash</Text>
          </View>
          <View style={styles._subHead2}>
          </View>
        </View>

        <View style={styles._teamPage}>
           
            <View style={{flex:1,flexDirection: 'column'}}> 
                    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 24 ,alignSelf:'center', color:'#2e7d32',}}>ขยะย่อยสลายได้</Text>
                        <View style={{flex:1,flexDirection: 'column',marginLeft:10,marginRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',}}>ถังขยะสีเขียว</Text>
                            <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575'}}> ถังขยะสีเขียว (Organic waste) ใช้สำหรับรองรับขยะที่ย่อยสลายได้ อินทรียวัตถุที่ย่อยสลายเน่าเปื่อยง่าย  ขยะประเภทนี้สามารถนำมาหมักทำปุ๋ยและอาหารสัตว์ได้</Text>
                            <Text style={{fontWeight: 'bold',fontSize: 13 ,paddingBottom:10,color:'#424242',}}>ขยะประเภทนี้สามารถนำมาหมักทำปุ๋ยและอาหารสัตว์ได้ดังนี้</Text>
                            <Text style={{fontWeight: 'bold',fontSize: 13 ,color:'#424242',marginLeft:10}}>๑. น้ำจุลินทรีย์ชีวภาพ</Text>
                            <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center'}}
                                               source={require('../img/Or3.png')}
                                              />
                              <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',marginTop:10}}>น้ำจุลินทรีย์ชีวภาพ ทำปุ๋ย ฮอร์โมนพืช สารไล่แมลง เศษผัก เศษอาหาร เปลือกผลไม้ ใบไม้ ใบหญ้า นำไปหมักโดยผสมกับกากน้ำตาลหรือน้ำตาลทรายแดง ใช้เป็นปุ๋ย ฮอร์โมน สารไล่แมลงสำหรับต้นไม้ ใช้ดับกลิ่น ทำให้น้ำใส ย่อยกากตะกอนสิ่งปฏิกูล มีวิธีการง่าย ๆ ดังนี้ - การทำหัวเชื้อน้ำหมักจุลินทรีย์ นำเศษผักหรือผลไม้ ๓ กิโลกรัม + กับกากน้ำตาล ๑ กิโลกรัม คลุกเคล้าให้เข้ากันดี ใส่ถังพลาสติกปิดฝาเก็บไว้ในที่ร่ม ๑๕ วัน จะได้น้ำชีวภาพพร้อมขยาย หรือนำไปใช้ได้ น้ำหมักชีวภาพสามารถทำฮอร์โมนเร่งใบ เร่งดอก สารป้องกันศัตรูพืชได้ เหมาะสำหรับท่านที่มีมุมต้นไม้เล็ก ๆ ในบ้าน จนถึงท่านที่มีอาชีพเกษตรกร จะช่วยลดต้นทุนได้มาก เพียงเลือกวัสดุหมักตามสูตรง่าย ๆ ดังนี้ - สูตรเร่งใบ ใช้น้ำเอ็นไซมื ๑ ลิตร + น้ำ ๑๐ ลิตร + น้ำตาลทรายแดง + ผักบุ้ง + ผักกาดหอม + ใบมันเทศ + เปลือกสับปะรด อย่างละ ๑ กก. คลุกเคล้าให้เข้ากัน ปิดฝาถังหมักทิ้งไว้ ๗-๑๕ วัน ใช้ฉีดพ่นรดต้นไม้สัปดาห์ละ ๒ ครั้ง อัตราส่วน ๒ ช้อนโต๊ะฝน้ำ ๒๐ ลิตร - สูตรเร่งดอก ราก ผล น้ำเอนไซม์ 1 ลิตร + น้ำมะพร้าว ๕ ลิตร + น้ำตาลทรายแดง + กล้วยสุก + ฟักทองสุก + มะละกอสุก อย่างละ ๑ กก. คลุกเคล้าให้เข้ากัน ปิดฝาถังหมักทิ้งไว้ ๓-๗ วัน นำไปใช้ฉีดพ่นรดต้นไม้สัปดาห์ละ ๒ ครั้ง อัตราส่วน ๒ ช้อนโต๊ะน้ำ ๒๐ ลิตร</Text>   
                            <Text style={{fontWeight: 'bold',fontSize: 13 ,color:'#424242',marginLeft:10}}>๒. การทำปุ๋ยใบไม้แห้ง</Text>
                            <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center'}}
                                               source={require('../img/Or2.png')}
                                              />
                              <Text style={{fontSize: 13 ,paddingBottom:5,color:'#757575',marginTop:10}}>การทำปุ๋ยใบไม้แห้ง ใบไม้แห้งมีประโยชน์มาก ใช้จัดการกับเศษอาหารให้สลายหายไปใน ๓-๕ วัน ใบไม้แห้งช่วยดูดซับกลิ่น และช่วยดูดซับน้ำจากเศษอาหาร ทำให้ใช้เป็นที่ทิ้งเศษอาหารในบ้านได้เลย วิธีการง่าย ๆ ดังนี้ </Text>
                              <Text style={{fontSize: 13 ,paddingBottom:5,color:'#757575',marginLeft:20}}>๑) หาที่เหมาะ ๆ ที่น้ำไม่ไหลท่วมขัง การระบายอากาศดี มีร่มเล็กน้อย แล้วจัดหาวัสดุที่มีอยู่ เช่น วงบ่อ คอกไม้ คอกคอนกรีต หรือถังพลาสติกเจาะรู้รอบ ๆ มาตั้งไว้ ทำฝาปิดกันหนู สุนัขคุ้ยเขี่ย และกันแดดกันฝน </Text>
                              <Text style={{fontSize: 13 ,paddingBottom:5,color:'#757575',marginLeft:20}}>๒) เทใบไม้แห้งลงในถังหรือภาชนะที่เตรียมไว้ให้เกินครึ่งกระบะเล็กน้อย เทเศษอาหารบนใบไม้แห้ง แล้วใช้พลั่วคลุกเคล้าให้เศษอาหารกระจายตัว ทิ้งไว้ ๓ วัน กลับมาเปิดดูจะเห็นว่าเศษอาหารหายไป ฉะนั้นจึงเติมเศษอาหารได้ทุกวัน </Text>
                              <Text style={{fontSize: 13 ,paddingBottom:5,color:'#757575',marginLeft:20}}>๓) เติมใบไม้แห้งทุกสัปดาห์เพราะจะมีการยุบตัวจากการย่อยสลายเศษอาหารและใบไม้ ทิ้งเศษอาหารได้ทุกวันจนเต็ม ทิ้งไว้ ๓-๔ เดือน ก็นำปุ๋ยไปใช้หรือขายได้ </Text>
                            <Text style={{fontWeight: 'bold',fontSize: 13 ,color:'#424242',marginLeft:10}}>๓. อาหารสัตว์ เศษอาหาร เปลือกผลไม้</Text>
                              <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575'}}> อาหารสัตว์ เศษอาหาร เปลือกผลไม้ คัดแยกใส่ถังไว้ต่างหากแล้วนำไปเลี้ยงปลา เลี้ยงหมู เลี้ยงวัว ได้ประหยัดค่าอาหารสำเร็จรูป ปัจจุบันมีเกษตรกรนำถังไปตั้งตามร้านอาหาร ตามห้าง โรงแรมต่าง ๆ แล้วนำไปเลี้ยงสัตว์ทำให้สัตว์โตเร็ว ประหยัดค่าใช้จ่ายได้มาก</Text>
                        </View>
                        </ScrollView>
                 </View> 
        </View>
      
      </View>
    )
}
}


class ThirdScreen extends React.Component {
render() {
  const { navigate } = this.props.navigation;
    return (
   

      <View style={styles._container}>
        <View style={styles._header}>
          <View style={styles._subHead2}>
            
       <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
                  onPress={() => navigate('Home')}>  
                    <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/arrow.png')}/>
                  </TouchableHighlight>
          </View>
          <View style={styles._subHead1}>
            <Text style={styles._headText}>uTrash</Text>
          </View>
          <View style={styles._subHead2}>
          </View>
        </View>
        <View style={styles._teamPage}>
            <View style={{flex:1,flexDirection: 'column'}}>
                    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 24 ,alignSelf:'center', color:'#f9a825',marginBottom:10,}}>ขยะรีไซเคิล</Text>
                    
                        <View style={{flex:1,flexDirection: 'column',marginLeft:10,marginRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',}}>ขยะถังสีเหลือง</Text>
                            <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ถังขยะสีเหลือง (Recycle waste) ใช้สำหรับรองรับขยะที่สามารถนำกลับมารีไซเคิล หรือขายได้ เช่น แก้ว กระดาษ พลาสติก โลหะ</Text>  
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',paddingBottom:5}}>1. ประเภทพลาสติก</Text>
                            <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Re5.png')}
                                              />
                              <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',paddingTop:5}}> ขยะประเภทพลาสติกมีจำนวนเพิ่มขึ้นอย่างรวดเร็ว เพราะสินค้าและบรรจุภัณฑ์ต่างๆ ส่วนมากทำมาจากพลาสติก เช่น ขวดนม กระป่องยา ขวดอาหาร เป็นต้น  ถึงแม้ว่าพลาสติกไม่สามารถย่อยสลายได้โดยธรรมชาติ ดังนั้นจึงทำให้ยากต่อการกำจัดโดยการฝังกลบ แต่การกำจัดขยะพลาสติกโดยการฝังกลบไม่ใช่วิธีการที่ถูกต้อง เนื่องจากขยะพลาสติกสามารถนำกลับมาใช้ใหม่ได้เกือบทุกประเภท พลาสติกที่ไม่สามารถรีไซเคอลได้ ได้แก่ พลาสติกชนิดยูเรีย เมลามีน อีพอกซี่ นอกนั้นสามารถรีไซเคิลได้หมด แต่บางครั้งยังมีข้อจำกัดอีกหลายเรื่องที่ไม่สามารถนำพลาสติกทุกชนิดมารีไซเคิลได้ เช่นด้านความต้องการของโรงงานรีไซเคิล หรือพลาสติกบางประเภทมีน้ำหนักเบาและเก็บรวบรวมได้ยากจึงไม่นิยมนำมารีไซเคิล เช่น ถุงพลาสติก เป็นต้น</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๑.๑ พลาสติกที่สามารถนำมารีไซเคิล ได้แก่</Text>  
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๑)  โพลีโพรพิลิน (Polypropylene;PP) พลาสติกประเภทนี้เป็นที่นิยมนำมาใช้เป็นถ้วยนมเปรี้ยว กระป๋องมันฝรั่งทอด และถังเนยเทียม</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๒)  โพลีสไตรีน (Polystyrene;PS) พลาสติกประเภทนี้เป็นที่นิยมนำมาใช้เป็นภาชนะแทนโฟม ถาดสลัด กล่องบรรจุวิดีโอและซีดี</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๓)  โพลีเอทิลีน (Polyethylene;PE) พลาสติกประเภทนี้เป็นที่นิยมนำมาใช้ทำขวดเครื่องดื่มหรือขวดน้ำอัดลม</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๔)  โพลิไวนิลคลอไรด์ (Polyvinyl Chloride;PVC) พลาสติกประเภทนี้เป็นที่นิยมนำมาใช้เป็นภาชนะบรรจุอาหาร สายไฟ และท่อน้ำ</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๕)  โพลิเอทิลีนที่มีความหนาแน่นสูง (High-density Polyethylene;HDPE) พลาสติกประเภทนี้เป็นที่นิยมนำมาใช้เป็นเหยือกน้ำผลไม้ เหยือกนม ของเล่น ขวดน้ำยาซักผ้า</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10,paddingBottom:5}}>(๖)  โพลิเอทิลินที่มีความหนาแน่นต่ำ (Low-density Polyethylene;LDPE) พลาสติกประเภทนี้เป็นที่นิยมนำมาใช้เป็นพลาสติกใสสำหรับห่ออาหาร และถุงหิ้ว</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๑.๒  การคัดแยกพลาสติกเพื่อนำไปรีไซเคิล</Text>
                                  <Text style={{fontSize: 13,color:'#757575',}}>พลาสติกที่ซื้อขายเกันเพื่อนำกลับมารีไซเคิลมีราคาแตกต่างกันตั้งแต่ 3-8 บาท ขึ้นอยู่กับประเภทของพลาสติกก่อนนำไปขายจะมีการจัดการขยะพลาสติกให้ดีก่อน ดังนี้</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๑)  ขวดให้สิ่งปนเปื้อนออกให้หมด ดึงฉลากและสิ่งต่างๆ ที่ติดกับพลาสติกออกให้หมด</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๒)  ทำให้แบนเพื่อประหยัดเนื้อที่</Text>
                                  <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}>(๓)  คัดแยกพลาสติกออกตามปรเภท อาจจะสังเกตประเภทของพลาสติกจากเครื่องหมายที่ก้อนบรรจุภัณฑ์ก็ได้ เพราะบางทีจะมีเครื่องหมายรีไซเคิลพร้อมทั้งตัวเลขระบุประเภทของพลาสติก หรืออาจนำพลาสติกมาแช่น้ำเพื่อแยกประเภทพลาสติก เพราะพลาสติกแต่ละประเภทมีความหนาแน่นไม่เท่ากัน</Text>
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',paddingBottom:5}}>๒. ประเภทกระดาษ</Text>
                              <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Re1.png')}
                                              />
                                  <Text style={{fontSize: 13,color:'#757575',paddingBottom:5,paddingTop:5}}>ขยะมูลฝอยจากบ้านเรือนและสำนักงานจะมีกระดาษเป็นองคืประกอบที่สำคัญตัวหนึ่ง เนื่องจากในชีวิตประจำวันของเราจะต้องเกี่ยวพันกับการใช้กระดาษ ไม่ว่าจะเป็นหนังสือพิมพ์ กระดาษคอมพิวเตอร์ ถุงกระดาษ กระดาษลัง เป้นต้น กระดาษเหล่านี้สามารถนำกลับมารีไซเคิลได้ กระดาษที่ไม่สามารถนำกลับมารีไซเคิลได้ เช่น กระดาษห่อของขวัญ กระดาษกล่องแอปเปิล เพราะกระดาษประเภทนี้มีเยื่อเซลลูโลสน้อยมากไม่เหมาะที่จะนำมารีไซเคิลอีก</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๒.๑  การจัดการขยะประเภทกระดาษเพื่อนำมารีไซเคิล</Text>
                                  <Text style={{fontSize: 13,color:'#757575'}}>   กระดาษแต่ละประเภทมีราคารับซื้อไม่เท่ากัน ถ้าขายรวมๆ กันก็จะได้ราคารวมเย่างต่ำเพียงกิโลกรัมละ 1 บาท และที่สำคัญกระดาษที่นำมากขายจะต้องไม่เปื้อนคราบน้ำมันต่างๆ ดังนั้นจึงควรมีการแยกประเภทกระดาษก่อนที่จำนำไปขายตามประเภทดังนี้</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}> -  กระดาษแข็งกล่องน้ำตาล</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}> -  กระดาษย่อยและหนังสือเล่มทั่วไป</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}> -  กระดาษขาวสำนักงาน</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}> -  กระดาษหนังสือพิมพ์</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}> -  สมุดโทรศัพท์</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10}}> -  กระดาษสมุดนักเรียน</Text>
                                    <Text style={{fontSize: 13,color:'#757575',marginLeft:10,paddingBottom:5}}> -  กล่องยูเอชที</Text>
                                    
                                <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๒.๒  การรีไซเคิลกระดาษ</Text>
                                    
                                  <Text style={{fontSize: 13,color:'#757575'}}>   กระดาษที่รับซื้อจากบ้านเรือนหรือแหล่งต่างๆ จะถูกส่งไปยังโรงงานผลิตกระดาษ เพื่อใช้เป็นวัตถุดิบผสมในการผลิตกระดาษประเภทต่างๆ กระดาษมีหลายชนิดและหลายคุณภาพ กระดาษขาวสำหรับเขียนหรือการะดาษคอมพิวเตอร์จะเป็นกระดาาที่มีคุณภาพสูง จึงถูกนำมาแปรรูปเป็นกระดาษสมุดและหนังสือ ส่วนหนังสือพิมพ์และกระดาษกล่องจะมีคุณภาพต่ำ จึงถูกนำมาแปรรูปเป็นกระดาษกล่องบรรจุเครื่องดื่ม กระดาษห่อของขวัญ กล่องกระดาษแข็ง การรีไซเคิลกระดาษจะเริ่มด้วยกำจัดหมึกออกและตีกระดาษให้เปื่อยยุ่ยเป็นเยื่อกระดาษและเติมเยื่อกระดาษใหม่เข้าไป ซึ่งสัดส่วนเยื่อกระดาษรีไซเคิลกับเยื่อกระดาษใหม่ขึ้นอยู่กับประเภทของกระดาษที่จะผลิตแล้วจะเข้าสู่กระบวนการผลิตกระดาษต่อไป</Text>
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',}}>๓.  ประเภทแก้ว</Text>
                                      <Text style={{fontSize: 13,color:'#757575'}}>แก้วเป็นผลิตภัณฑ์ที่ทำมาจากทรายโดยมีหินปูนและโซดาไฟเป็นส่วนผสม โดยนำมาหลอมและขึ้นรูปเป็นภาชนะต่างๆ เช่น แก้วน้ำ ขวดอาหารและเครื่องดื่ม ฯลฯ แก้วเป็นวัสดุที่ไม่สามารถย่อยสลายได้ ขวดแก้วทุกประเภทสามารถนำมารีไซเคิลได้แต่ขวดแก้วแต่ละประเภทแต่ละสีจะมีาคาต่างๆ คือ ขวดแก้วสีขาวจะมีราคาดีที่สุด รองลงมาคือสีชาและสีเขียว ถ้าเป็นขวดดีไม่แตกก็จะได้ราคาสูงกว่าขวดแตกหรือเศษแก้ว ดังนั้นควรมีการคัดแยกแก้วออกตามสี</Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>   การนำแก้วไปรีไซเคิล</Text>
                                      <Text style={{ fontSize: 14 ,marginLeft:5,color:'#424242',paddingBottom:5}}>-  ขวดแก้วดี </Text>
                                          <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Re2.png')}
                                              />
                                        <Text style={{fontSize: 13,color:'#757575',paddingTop:10}}> ขวดแก้วที่ไม่แตกจะถูกนำมาคัดแยกตามสีและประเภทที่บรรจุสินค้า เช่น ขวดแม่โขง ขวดเบียร์ ขวดน้ำปลา ขวดซอส ขวดน้ำอัดลมแบบวันเวย์ ฯลฯ  ขวดแก้วเหล่านี้หากไม่แตกบิ่นเสียหายจะถูกส่งแลับเข้าโรงงานเพื่อนำไปล้างและฆ่าเชื้อโรคและนำกลับมาบรรจุสินค้าใหม่ซ้ำอีกอย่างน้อยถึง ๓๐ ครั้ง โดยผู้ผลิตสินค้าเดิม เช่น บริษัทผลิตเบียร์จำนำขวดเบียร์ที่ใช้แล้วมาผ่านกระบวนการล้างและทำความสะอาดด้วยสารเคมีต่างๆ แล้วจึงนำกลับมาบรรจุเบียร์อีกครั้ง</Text>
                                      <Text style={{ fontSize: 14 ,marginLeft:5,color:'#424242',paddingBottom:5}}>-  ขวดแก้วแตกหรือเศษแก้ว</Text>
                                          <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Re4.png')}
                                              />
                                        <Text style={{fontSize: 13,color:'#757575',paddingTop:10}}> ขวดที่แตกชำรุดเสียหายจะถูกนำมาคัดแยกสี คือ ขวดแก้วขาว ขวดแก้วสีชา ขวดแก้วสีเขียว แมื่อแยกสีแล้วจะถูกส่งเข้าโรงงานหลอมแก้ว เพื่อทุบให้แตกละเอียด ล้างทำความสะอาดด้วยสารเคมีและหลมละลาย เพื่อเป่าเป็นขวดใหม่</Text>
                            <Text style={{fontWeight: 'bold', fontSize: 18 ,marginLeft:5,color:'#424242',paddingBottom:5}}>๔.  ประเภทโลหะ</Text>
                                  <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Re3.png')}
                                              />
                                <Text style={{fontSize: 13,color:'#757575',paddingBottom:5,paddingTop:10}}>โลหะหลากหลายชนิดสามารถนำมารีไซเคิลได้โดยการนำมาหลอมและแปรรูปเป็นผลิตภัณฑ์อื่นๆ สามารถแบ่งโลหะออกได้ ๓ กลุ่มใหญ่ คือ</Text>      
                                  <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๑. โลหะประเภทเหล็ก</Text>
                                    <Text style={{fontSize: 13,color:'#757575'}}>เหล็กสามารถนำมารีไซเคิลได้ทุกชนิด สามารถแบ่งได้เป็น ๓ ประเภท คือ เหล็กหล่อ เหล็กหนา และเหล็กบาง ราคราซื้อขายจะต่างกันตามประเภทของเหล็ก ซึ่งพ่อค้ารับซื้อของเก่าจะทำการตัดเหล็กตามขนาดต่างๆ ตามที่ท่างโรงงานกำหนดเพื่อสะดวกในการเข้าเตาหลอมและการขนส่ง</Text>                                  
                                  <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๒. โลหะประเภทอะลูมิเนียม</Text>
                                    <Text style={{fontSize: 13,color:'#757575'}}>โลหะประเภทอะลูมิเนียม  แบ่งออกได้เป็น ๒ ประเภทคือ (๑) อะลูมินียมหนา เช่น อะไหร่เครื่องยนต์ ลูกสูบ อะลูมิเนียมาอัลลอย ฯลฯ (๒) อะลูมิเนียมบาง เช่น หม้อ กะละมังซักผ้า ขันน้ำ กระป๋องเครื่องดื่ม ฯลฯ ราคาซื้อขายโลหะประเภทอะลูมิเนียมมีราคาตั้งแต่ 10 บาท ถึง 45 บาท แล้วแต่ประเภท อะลูมิเนียมหนาจะมีราคาแพงกว่าอะลูมิเนียมบาง แต่ขยะอะลูมิเนียมที่พบมากในกองขยะส่วนใหญ่จะเป็นพวกกระป๋องเครื่องดื่ม เช่น กระป๋องน้ำอัดลม กระป๋องเบียร์  โดยเฉพาะกระป๋องน้ำอัดลมจะเป็นขยะที่มีปริมาตรมาก ดังนั้นก่อนนำไปขายควรจะอัดกระป๋องให้มีปริมาตรเล็กลงเพื่อที่จะได้ประหยัดพื้นที่ในการขนส่ง สำหรับการรีไซเคิลกระป๋องอะลูมิเนียมนั้นพ่อค้ารับซื้อของเก่าจะทำการอัดกระป๋องอะลูมิเนียมให้มีขนาดตามที่ทางโรงงานกำหนดมา กระป๋องอะลูมิเนียมสามารถนำกลับมารีไซเคิลซื้กได้หลายๆ ครั้ง ไม่มีการกำจัดจำนวนครั้งของการผลิต เมื่อกระป๋องอะลูมิเนียมถูกส่งเข้าโรงงานแล้วจะถูกบดเป็นชิ้นเล็กๆ แล้วหลอมให้เป็นแท่งแข็ง จากนั้นนำไปรีดให้เป็นแผ่นบางเพื่อส่งต่ไปยังโรงงานผลิตกระป๋องเพื่อผลิตกระป่องใหม่</Text>
                                  <Text style={{fontWeight: 'bold', fontSize: 14 ,marginLeft:5,color:'#424242',}}>๒. โหละประเภททองเหลือง ทองแดง และสแตนเลส</Text>
                                    <Text style={{fontSize: 13,color:'#757575'}}>โลหะประเภทนี้มีราคาสูงประมาณ ๓๐-๖๐ บาท โดยทองเหลืองสามารถนำมากลับมาหลอมใหม่ โดยทำเป็นพระ ระฆัง อุปกรณ์สุขภัณฑ์ต่างๆ ส่วนทองแดงก็นำกลับมาหลอมทำสายไฟได้ใหม่</Text>
                                <Text style={{fontSize: 13,color:'#757575',paddingTop:10}}>ปัจจัยสำคัญในการรีไซเคิลวัสดุประเภทต่างๆ ไม่ว่าจะเป็นโลหะ พลาสติก กระดาษ แก้ว ก็คือจะต้องแยกประเภทของขยะรีไซเคิลแต่ละชนิดออกจากกันไม่ให้ปนกัน และทำความสะอาดวัสดุก่อนที่จะนำไปขาย ถ้าเป็นกระป่องก็ควรจะทำการอัดเพื่อลดปริมาตรของชขยะก่อนที่จำนำไปขาย</Text>
                        </View>
                        </ScrollView>
                </View>
        </View>
      </View>
    )
}
}


class FourthScreen extends React.Component {
render() {
  const { navigate } = this.props.navigation;
    return (
      <View style={styles._container}>
        <View style={styles._header}>
          <View style={styles._subHead2}>
                   <TouchableHighlight style={{height:'100%', width:'100%', flex:1,alignItems:'center',justifyContent:'center' }} 
                  onPress={() => navigate('Home')}>  
                    <Image style={{height:'60%', width:'60%',resizeMode: 'contain'}} source={require('../img/arrow.png')}/>
                  </TouchableHighlight>
          </View>
          <View style={styles._subHead1}>
            <Text style={styles._headText}>uTrash</Text>
          </View>
          <View style={styles._subHead2}>
          </View>
        </View>
        <View style={styles._teamPage}>
            <View style={{flex:1,flexDirection: 'column'}}>
                    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 24 ,alignSelf:'center', color:'#C62828',marginBottom:10,}}>ขยะอันตราย</Text>
                    
                        <View style={{flex:1,flexDirection: 'column',marginLeft:10,marginRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18 , marginLeft:5,color:'#424242',}}>ถังขยะสีแดง</Text>
                            <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ถังขยะสีแดง (Hazardous waste)  ใช้สำหรับรองรับขยะที่มีอันตราย ขยะที่มีพิษต่อสิ่งมีชีวิตและสิ่งแวดล้อม เช่น หลอดฟลูออเรสเซนต์ ขวดยา ถ่านไฟฉาย กระป๋องสีสเปรย์ กระป๋องยาฆ่าแมลง ภาชนะบรรจุสารอันตรายต่าง ๆ และเวลาผ่านไป สารเคมีที่เสื่อมสภาพภายในจะไหลออกสู่สิ่งแวดล้อม สารพิษนี้ก็จะเข้าสู่ระบบนิเวศและระบบห่วงโซ่อาหารผ่านทางเดิน น้ำ และอากาศ และก่อให้เกิดอันตรายต่าง ๆ ได้ดังนี้ </Text>
                            <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Ha3.png')}
                                              /> 

                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของตะกั่ว</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>เป็นส่วนประกอบของการบัดกรีร่วมกับดีบุกในแผงวงจร มีผลทำลายระบบประสาทส่วนกลางและระบบโลหิต การทำงานของไตและการสืบพันธุ์ มีผลต่อการพัฒนาสมองของเด็ก  นอกจากนี้ยังสามารถสะสมในบรรยากาศ และเกิดผลแบบเฉียบพลันหรือเรื้อรังกับพืช สัตว์ และจุลินทรีย์</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของแคดเมียม</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ซึ่งเป็นส่วนประกอบของแบตเตอรี่บางประเภท สามารถสะสมในร่างกาย โดยเฉพาะที่ไต ทำลายระบบประสาท ส่งผลเสียต่อพัฒนาการของเด็กและภาวะตั้งครรภ์ และยังอาจมีผลต่อพันธุกรรม</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของสารทนไฟซึ่งทำจากโบรมีน</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ซึ่งใช้ในกล่อยสายไฟ แผงวงจรและตัวเชื่อมต่ออาจเป็นพิษ และสะสมในสิ่งมีชีวิต ถ้ามีทองแดงร่วมด้วย จะเพิ่มความเสี่ยงในการเกิดไดอ๊อกซิน และฟิวแรนระหว่างการเผา ซึ่งเป็นสารก่อมะเร็งที่ร้ายแรงประเภทหนึ่งส่งผลเสียต่อระบบการย่อย และน้ำเหลือง ทำลายการทำงานของตับ มีผลต่อระบบประสาทและภูมิต้านทาน</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของเบริลเรียม</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ใช้ในสปิงและตัวเชื่อม เป็นสารก่อมะเร็ง โดยเฉพาะปอดซึ่งเป็นอวัยวะที่ได้รับสาร ผู้ได้รับสารนี้อย่างต่อเนื่องจากการสูดดมจะกลายเป็นโรค Berylicosis ซึ่งมีผลกับปอด หากสัมผัสจะทำให้เกิดแผลที่ผวหนังอย่างรุนแรง ทำให้ระบบการทำงานของต่อมไทรอยด์และต่อมไร้ท่อผิดปกติ สะสมในน้ำนม กระแสเลือดและถ่ายทอดในห่วงโซ่อาหาร</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของสารหนู</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ซึ่งใช้ในแผงวงจร จะมีผลทำลายระบบประสาท ผิวหนัง และระบบการย่อยอาหาร หากได้รับในปริมาณมาก อาจทำให้ถึงตายได้</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของนิกเกิล</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ซึ่งเป็นองค์ประกอบของแบตเตอรี่ ฝุ่นนิกเกิลถูกจัดว่าเป็นสารก่อมะเร็งในสัตว์ทดลองและอาจเป็นสาเหตุให้เกิดมะเร็งปอดในสัตว์ทดลอง และอาจมีผลต่อระบบสืบพันธุ์ด้วย นอกจากนี้ ผลเรื้อรังจากการสัมผัสนิกเกิล ได้แก่ การแพ้ของผิวหนัง ซึ่งประกอบด้วย การมีแผลไหม้ คัน เป็นผื่นแดง มีอาการแพ้คล้ายการเป็นหืดหอบ และแน่นหน้าอก</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}>ความเป็นพิษของลิเทียม</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ซึ่งเป็นองค์ประกอบของแบตเตอรี่ เป็นอันตรายเมื่อกลืนกินสูดดม หรือถูกดูดซึมผ่านผิวหนัง สารนี้ทำลายเนื้อเยื่อของเยื่อบุเมือกและทางเดินหายใจ รวมทั้งดวงตาและผิวหนังอย่างรุนแรง การสูดดมอาจก่อให้เกิดอาการชัก กล่องเสียงและหลอดลมใหญ่อักเสบ โรคปอดอักเสบจากสารเคมี และน้ำท่วมปอด อาการต่าง ๆ ของการได้รับสารประกอบด้วยความรู้สึกปวดแสบปวดร้อน ไอ หายใจ มีเสียงหวีด การอัเสบที่ตอนบนของหลอดลม หายใจถี่ ปวดศรีษะ คลื่นเหียน และอาเจียน</Text>
                                <Text style={{ fontSize: 14 ,paddingTop: 5,color:'#424242',}}> ความเป็นพิษของโคบอลท์</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',}}>ถูกจัดว่าเป็นสารก่อมะเร็งในสัตว์ทดลอง การหายใจเข้าไปจะก่อให้เกิดการระคายเคืองต่อเยื่อเมือกและทางเดินหายใจ ก่อให้เกิดอาการไอ และหายใจติดขัด และหายใจถ่รัว ผลกระทบของการสัมผัสสารนี้เป็นระยะเวลานานหรือการสัมผัสซ้ำ ๆ จะก่อให้เกิดการอักเสบของผิวหนัง ทำให้เกิดผื่นแดง ทำให้เกิดผลกระทบต่อระบบเลือด หัวใจ และต่อมไทรอยด์ และอาจทำให้เกิดความผิดปกติของปอด</Text>

                                <Text style={{ fontWeight: 'bold',fontSize: 14 ,paddingTop: 5,color:'#424242',}}>แนวทางการจัดการซากโทรศัพท์มือถือและแบตเตอรี่ในประเทศไทย</Text> 
                                  <Image style={{width:"90%",height:200,/*opacity:0.2,*/alignSelf:'center',}}
                                               source={require('../img/Ha1.png')}
                                              /> 
                                  <Text style={{ fontWeight: 'bold',fontSize: 14 ,paddingTop: 5,color:'#424242',}}>๑.  การป้องกันและลดการเกิดซากฯ</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - ผู้ผลิต พัฒนาผลิตภัณฑ์ให้ใช้สารอันตรายน้อยที่สุดและออกแบบให้สามารถรีไซเคิลได้ง่าย</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - เลือกซื้อ เลือกใช้ผลิตภัณฑ์ที่มีคุณภาพ ได้มาตรฐาน เพื่อยืดอายุการใช้งาน ลดการกลายเป็นซากฯ เลี่ยงการใช้ผลิตภัณฑ์ที่มีสารอันตรายเป็นส่วนประกอบ</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',marginLeft:15}}>  - ใช้อย่างคุ้มค่า เลือกซื้อรุ่นที่เหมาะสมกับการใช้งาน ใช้อย่างระมัดระวัง ดูแลรักษาตามคู่มือการใช้งาน ซ่อมแซม หรือให้ผู้อื่นใช้ต่อก่อนจะทิ้งเป็นซากฯ</Text>
                                  <Text style={{ fontWeight: 'bold',fontSize: 14 ,paddingTop: 5,color:'#424242',}}>๒.  การแยกทิ้ง</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - ไม่ทิ้งซากฯ ปะปนกับขยะทั่วไป ไม่นำซากฯ ไปเผา ฝังดิน หรือทิ้งในแหล่งน้ำ</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',marginLeft:15}}>  - ทิ้งซากฯ ตามสถานที่ หรือ ตามเวลาที่กำหนด นำซากฯ ไปทิ้งยังสถานที่ หรือ จุดรับทิ้งที่หน่วยงานท้องถิ่น ผู้ผลิต หรือผู้ให้บริการแครือข่ายโทรศัพท์มือถือจัดไว้ให้ หรือ ทิ้งให้กับหน่วยงานท้องถิ่นในเขตของท่าน ตามวัน เวลาที่กำหนดสำหรับการทิ้งของเสียอันตรายจากชุมชน</Text>
                                  <Text style={{ fontWeight: 'bold',fontSize: 14 ,paddingTop: 5,color:'#424242',}}>๓.  การรีไซเคิล</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:5}}>  การหมุนเวียนซากแบตเตอรี่กลับมาแปรรุปใช้ใหม่ เนื่องจากแบตเตอรี่ของโทรศัพท์มือถือนี้มีโลหะมีค่าเป็นส่วนประกอบจึงมีความคุ้มค่าที่จะสามารถนำมารีไซเคิลได้ การรีไซเคิลในต่างประเทศมีกระบวนการ ดังนี้</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - นำแบตเตอรี่ไปบดและใส่ลงไปในสารละลายเฉพาะ</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - น้ำเสียที่เกิดขึ้น นำไปปรับสภาพให้เป็นกลาง</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - แยกโลหะหนักที่มีออก โดยการใช้ไฟฟ้าหรือวิธีอื่น</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - นำโลหะหนักที่ได้ไปใช้ใหม่</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:15}}>  - ส่วนที่เหลือนำไปฝังกลบ ตามวิธีที่กล่าวในข้างต้น</Text>
                                    <Text style={{fontSize: 13 ,paddingBottom:10,color:'#757575',marginLeft:15}}>  - หรือนำแบตเตอรี่ผ่านกระบวนการถลุงในเตาหลอมเพื่อแยกโลหะมีค่ากลับมาใช้ใหม่</Text>
                                  <Text style={{ fontWeight: 'bold',fontSize: 14 ,paddingTop: 5,color:'#424242',}}>๔.  การบำบัดและกำจัดซากแบตเตอรี่</Text>
                                    <Text style={{fontSize: 13 ,color:'#757575',marginLeft:5}}>      ในขั้นต้น รวบรวมวากแบตเตอรี่แล้วให้ดำเนินการคัดแยกส่วนที่นำกลับมาใช้ใหม่ได้ออกจากส่วนที่ต้องนำไปกำจัด และนำส่วนที่ต้องกำจัดไปดำเนินการปรับเสถียรก่อน เพื่อให้สารพิษมีความเสถียรเพิ่มขึ้น ไม่เกิดปฏิกิริยาหรือรั่วไหลปนเปื้อน และไม่ละลายเมื่อถูกชะล้าง ก่อนจะนำไปฝังในสถานที่ฝังกลบแบบปลอดภัย (Secured Landfill) ซึ่งออกแบบให้สามารถป้องกันมิให้มีการรั่วไหลของสารพิษออกสู่สิ่งแวดล้อม โดยใช้วัสดุสังเคราะห์กันซึมหลายชั้น พร้อมระบบเก็บรวบรวมน้ำชะ (Leachate) และระบบการตรวจสอบการรั่วซึมภายใต้กำระเบียบและมาตรฐานที่กำหนด ปัจจุบันผู้ประกอบการรับซากโทรสัพท์มือถือและซากแบตเตอรี่มาผ่านกระบวนการรีไซเคิลที่มีการควบคุมมลพิษอย่างถูกต้องเพื่อนำโลหะมีค่ากลับมาใช้ใหม่อีกครั้ง โดยส่งออกไปดำเนินการในต่างประเทศทีมีเทคโนโลยีชั้นสูง</Text>
                                    


                        </View>
                        </ScrollView>
                </View>
            

        </View>
      </View>


    )
}
}

///////////////////////////////Navigation///////////////////////////////////

const main = StackNavigator({
  Intro: { screen: IntroScreen },
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Task: { screen: TaskScreen },
  Last: { screen: LastScreen },
  Stat: {screen: StatScreen},
  Fourth: { screen: FourthScreen },
  First: { screen: FirstScreen },
  Second: { screen: SecondScreen },
  Third: { screen: ThirdScreen },
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
  });



export default main