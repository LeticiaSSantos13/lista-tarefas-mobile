import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";


export default function Home() {

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Minha Lista de Tarefas
      </Text>

      <Text style={styles.subtitulo}>
        Organize suas atividades facilmente
      </Text>


      <Pressable
        style={styles.botao}
        onPress={() => router.push("/tarefas")}
      >
        <Text style={styles.textoBotao}>
          Ver tarefas
        </Text>
      </Pressable>



      <Pressable
        style={styles.botao}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.textoBotao}>
          Nova tarefa
        </Text>
      </Pressable>


    </View>

  );

}



const styles = StyleSheet.create({

container:{
 flex:1,
 justifyContent:"center",
 alignItems:"center",
 backgroundColor:"#fff"
},


titulo:{
 fontSize:28,
 fontWeight:"bold",
 marginBottom:15
},


subtitulo:{
 fontSize:16,
 marginBottom:40
},


botao:{
 backgroundColor:"#2563eb",
 width:220,
 padding:15,
 borderRadius:10,
 marginBottom:15,
 alignItems:"center"
},


textoBotao:{
 color:"#fff",
 fontSize:18,
 fontWeight:"bold"
}


});