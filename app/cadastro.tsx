import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { useState } from "react";

import { getDatabase } from "../src/database/database";

import { router } from "expo-router";

export default function Cadastro(){

const [titulo,setTitulo] = useState("");
const [descricao,setDescricao] = useState("");
const [categoria,setCategoria] = useState("");



async function salvar(){

  try {

    const db = await getDatabase();


    await db.runAsync(

      `
      INSERT INTO tarefas
      (
        titulo,
        descricao,
        categoria,
        status,
        data
      )

      VALUES (?, ?, ?, ?, ?)

      `,

      [
        titulo,
        descricao,
        categoria,
        "pendente",
        new Date().toISOString()
      ]

    );


    console.log("Tarefa salva com sucesso!");

    setTitulo("");
    setDescricao("");
    setCategoria("");

    router.push("/tarefas");



  } catch(error){

    console.log("Erro ao salvar:", error);

  }

}



return(

<View style={styles.container}>


<Text style={styles.titulo}>
Nova tarefa
</Text>



<TextInput

style={styles.input}

placeholder="Título da tarefa"

value={titulo}

onChangeText={setTitulo}

/>



<TextInput

style={styles.input}

placeholder="Descrição"

value={descricao}

onChangeText={setDescricao}

/>



<TextInput

style={styles.input}

placeholder="Categoria"

value={categoria}

onChangeText={setCategoria}

/>



<Pressable

style={styles.botao}

onPress={salvar}

>

<Text style={styles.textoBotao}>
Salvar
</Text>


</Pressable>



</View>

)

}



const styles = StyleSheet.create({

container:{
flex:1,
padding:30,
justifyContent:"center"
},


titulo:{
fontSize:28,
fontWeight:"bold",
marginBottom:30,
textAlign:"center"
},


input:{
borderWidth:1,
borderColor:"#ccc",
padding:15,
borderRadius:10,
marginBottom:15,
fontSize:16,
color:"#000",
backgroundColor:"#fff"
},


botao:{
backgroundColor:"#2563eb",
padding:15,
borderRadius:10,
alignItems:"center"
},


textoBotao:{
color:"#fff",
fontSize:18,
fontWeight:"bold"
}


});