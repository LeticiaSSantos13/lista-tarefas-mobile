import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";


import {
  router,
  useLocalSearchParams
} from "expo-router";


import {
  useEffect,
  useState
} from "react";


import {
  atualizarTarefa,
  getTarefaPorId
} from "../src/database/database";



export default function Editar(){


const { id } = useLocalSearchParams();



const [titulo,setTitulo] = useState("");

const [descricao,setDescricao] = useState("");

const [categoria,setCategoria] = useState("");




async function carregar(){


const tarefa:any = await getTarefaPorId(
  Number(id)
);


setTitulo(tarefa.titulo);

setDescricao(tarefa.descricao);

setCategoria(tarefa.categoria);


}





async function salvar(){


await atualizarTarefa(

Number(id),

titulo,

descricao,

categoria

);


router.push("/tarefas");


}




useEffect(()=>{

carregar();

},[]);





return(

<View style={styles.container}>


<Text style={styles.titulo}>
Editar tarefa
</Text>



<TextInput

style={styles.input}

value={titulo}

onChangeText={setTitulo}

/>




<TextInput

style={styles.input}

value={descricao}

onChangeText={setDescricao}

/>




<TextInput

style={styles.input}

value={categoria}

onChangeText={setCategoria}

/>





<Pressable

style={styles.botao}

onPress={salvar}

>


<Text style={styles.textoBotao}>
Salvar alteração
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
marginBottom:30
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
fontWeight:"bold"
}


});