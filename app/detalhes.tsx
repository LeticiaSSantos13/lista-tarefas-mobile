import {
  Pressable,
  StyleSheet,
  Text,
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
  excluirTarefa,
  getTarefaPorId
} from "../src/database/database";



export default function Detalhes(){


  const { id } = useLocalSearchParams();


  const [tarefa, setTarefa] = useState<any>(null);



  async function carregarTarefa(){

    const resultado = await getTarefaPorId(
      Number(id)
    );


    setTarefa(resultado);

  }





  async function remover(){

    await excluirTarefa(
      Number(id)
    );


    router.push("/tarefas");

  }





  function editar(){

    router.push({

      pathname:"/editar",

      params:{
        id:id
      }

    });

  }





  function voltarMenu(){

    router.push("/");

  }





  useEffect(()=>{

    carregarTarefa();

  },[]);





  if(!tarefa){

    return(

      <View style={styles.container}>

        <Text style={styles.texto}>
          Carregando...
        </Text>

      </View>

    )

  }





  return(

    <View style={styles.container}>


      <Text style={styles.titulo}>
        Detalhes da tarefa
      </Text>




      <View style={styles.card}>


        <Text style={styles.label}>
          Título
        </Text>

        <Text style={styles.texto}>
          {tarefa.titulo}
        </Text>




        <Text style={styles.label}>
          Descrição
        </Text>

        <Text style={styles.texto}>
          {tarefa.descricao}
        </Text>




        <Text style={styles.label}>
          Categoria
        </Text>

        <Text style={styles.texto}>
          {tarefa.categoria}
        </Text>




        <Text style={styles.label}>
          Status
        </Text>

        <Text style={styles.texto}>
          {tarefa.status}
        </Text>



      </View>





      <Pressable

        style={styles.botaoEditar}

        onPress={editar}

      >

        <Text style={styles.textoBotao}>
          Editar tarefa
        </Text>

      </Pressable>





      <Pressable

        style={styles.botaoExcluir}

        onPress={remover}

      >

        <Text style={styles.textoBotao}>
          Excluir tarefa
        </Text>

      </Pressable>





      <Pressable

        style={styles.botaoMenu}

        onPress={voltarMenu}

      >

        <Text style={styles.textoBotao}>
          Voltar ao Menu
        </Text>

      </Pressable>





    </View>

  )

}





const styles = StyleSheet.create({


  container:{

    flex:1,

    padding:30,

    backgroundColor:"#fff"

  },



  titulo:{

    fontSize:28,

    fontWeight:"bold",

    color:"#000",

    marginBottom:25

  },



  card:{

    backgroundColor:"#f1f5f9",

    padding:20,

    borderRadius:12

  },



  label:{

    fontSize:18,

    fontWeight:"bold",

    color:"#000",

    marginTop:10

  },



  texto:{

    fontSize:17,

    color:"#333",

    marginTop:5

  },



  botaoEditar:{

    backgroundColor:"#16a34a",

    padding:15,

    borderRadius:10,

    marginTop:30,

    alignItems:"center"

  },



  botaoExcluir:{

    backgroundColor:"#dc2626",

    padding:15,

    borderRadius:10,

    marginTop:15,

    alignItems:"center"

  },



  botaoMenu:{

    backgroundColor:"#64748b",

    padding:15,

    borderRadius:10,

    marginTop:15,

    alignItems:"center"

  },



  textoBotao:{

    color:"#fff",

    fontSize:17,

    fontWeight:"bold"

  }


});