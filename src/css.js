import {StyleSheet} from 'react-native'
export default StyleSheet.create({ 
    containerCol: {
        flex: 1,
        backgroundColor:'red'   
    },
    _intro:{
        flex:1,
        backgroundColor:'white'
    },
    _centerScreen:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    _input:{
        height: '6%',
        width:'80%',
        backgroundColor:'#ffffff',
        borderRadius:2.5,
        marginBottom:'2.5%'
    },
    _loginButton:{
        backgroundColor:'#1565c0',
        height: '6%',
        width:'80%',
        borderRadius:2.5,
        marginTop:'2.5%',
        paddingVertical:'2%'
    },
    _loginText:{
        color:'white',
        textAlign:'center',
        fontWeight:'500'
    },
    _errorMsg:{
        color:'red',
        textAlign:'center',
    },
    _IMGcontainer: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'stretch',
        
    },
    _subBgLogin: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.7)',
    },
    _container: {
        flex: 1,
        flexDirection: 'column', 
    },
    _header:{
      flex:1,
      flexDirection:'row',
      backgroundColor:'#784212'  
    },
        _subHead1:{
            flex:8.5,
            backgroundColor:'#460000',
            alignItems:'center',
            justifyContent:'center'  
        },
        _subHead2:{
            flex:1.5,
            backgroundColor:'#460000',
            alignItems:'center',
            justifyContent:'center'  
        },
    _console:{
      flex:3,  
      backgroundColor:'black'
    },
    _console2:{
      flex:1,  
      backgroundColor:'#e0e0e0'
    },
    _team:{
      flex:1.25,  
      backgroundColor:'#c23838',
      alignItems:'center',
      justifyContent:'center',
    },
    _body:{
      flex:3.5,  
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
      

    },
    _footer:{
      flex:1.25,
      backgroundColor:'#460000', 
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',  
    },
    _langButton:{
        backgroundColor:'white',
        height: '50%',
        width:'60%',
        borderRadius:2.5,
        marginTop:'0.5%',
        paddingVertical:'7.5%'
    },
    _langText:{
        color:'#402a2d',
        textAlign:'center',
        fontWeight:'500'
    },
    _headText:{
        color:'white',
        textAlign:'center',
        fontWeight:'300',
        fontSize:22
    },
    _centerConsole:{
        flex:1,
        height:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    _subText:{
        color:'#bdbdbd',
        fontSize:12
    },
    _mainText:{
        color:'white',
        fontSize:18,
        fontWeight:'200',
    },
    _trashButton:{
        backgroundColor:'#e0e0e0',
        height:'55%',
        width:'55%',
        borderRadius:20,
        paddingVertical:'1.5%'
    },

    _trashText:{
        color:'#460000',
        textAlign:'center',
        fontWeight:'500',
        fontSize:20
    },
    _containerRow:{
      flex:1,
      flexDirection:'row',
    },
    _egde:{
      flex:0.25,
    },
    _subConsole2:{
      flex:3,
      alignItems:'center',
      justifyContent:'center'
    },
    _subText2:{
        color:'#616161',
        fontSize:12
    },
    _mainText2:{
        color:'#af1e23',
        fontSize:18,
        fontWeight:'200',
    },
    _stat1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c62828',
        marginLeft:'3%',
        marginTop:'3%',
        marginBottom:'1.5%',
        marginRight:'1.5%',
     },
    _stat2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9a825',
        marginLeft:'1.5%',
        marginTop:'3%',
        marginBottom:'1.5%',
        marginRight:'3%',
     },
        _stat3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e7d32',
        marginLeft:'3%',
        marginTop:'1.5%',
        marginBottom:'3.5%',
        marginRight:'1.5%',
     },
        _stat4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1565c0',
       marginLeft:'1.5%',
        marginTop:'1.5%',
        marginBottom:'3.5%',
        marginRight:'3%',
     },
    _teamPage:{
      flex:10,  
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
      flexDirection: 'column',
    },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  toolbar: {
    backgroundColor: '#460000',
    flexDirection: 'row',
    flex: 2,
    alignItems:'center',
    justifyContent:'center'
  },

  body: {
    backgroundColor: '#e0e0e0',
    flex: 15,
    flexDirection: 'column',
    width: '100%'
  },

  toolbar2: {
    backgroundColor: '#A81511',
    flexDirection: 'row',
    flex: 1.25,
    alignItems:'center',
    justifyContent:'center'
  },

  titleText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flex:1
  },

  titleText2: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    flex:5
  },
 titleText3: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flex:5
  },
  itemBar: {
    backgroundColor: '#c23838',
    flex: 5,
    flexDirection: 'row'
  },
  buttonBar: {
    backgroundColor: '#460000',
    flex: 2,
    flexDirection: 'row'
  },
  buttonStyle: {
        backgroundColor: '#DFDFDF',
        padding: 5,
        margin: 10,
        borderRadius: 20,
        width: 150,
    },

  buttonText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#460000',
      textAlign: 'center',

  },

  itemStyle: {
      
      backgroundColor: '#f5f5f5',
      flexDirection: 'row',
      height: 60,
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 5,
      shadowOffset:{  width: 50,  height: 50,  },
      shadowColor: 'black',
      shadowOpacity: 0.5,
  },

  plusButton: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'green'
  },

  itemOnBin: {
    flex:1, 
    flexDirection: 'column', 
    borderWidth: 2, 
    borderRadius: 10, 
    margin: 5,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  }

    
})
