import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable
} from "react-native";


import {
  useEffect,
  useState
} from "react";


import {
  router
} from "expo-router";


import {
  getTarefas
} from "../src/database/database";



export default function Tarefas(){


  const [tarefas,setTarefas] = useState<any[]>([]);

  const [pagina,setPagina] = useState(0);




  async function carregarTarefas(){

    try {

      const dados = await getTarefas(pagina);

      setTarefas(dados);


    } catch(error){

      console.log("Erro ao carregar tarefas:", error);

    }

  }





  useEffect(()=>{

    carregarTarefas();

  },[pagina]);






  return(

    <View style={styles.container}>


      <Text style={styles.titulo}>
        Lista de Tarefas
      </Text>





      <FlatList

        style={styles.lista}

        data={tarefas}


        keyExtractor={(item)=>item.id.toString()}



        renderItem={({item})=>(


          <Pressable

            style={styles.card}


            onPress={()=>{


              router.push({

                pathname:"/detalhes",

                params:{
                  id:item.id
                }

              });


            }}


          >


            <Text style={styles.nome}>
              {item.titulo}
            </Text>


            <Text style={styles.texto}>
              Categoria: {item.categoria}
            </Text>


            <Text style={styles.texto}>
              Status: {item.status}
            </Text>


          </Pressable>


        )}



        ListEmptyComponent={


          <Text style={styles.vazio}>
            Nenhuma tarefa cadastrada
          </Text>


        }


      />






      <View style={styles.paginacao}>


        <Pressable

          style={styles.botaoPagina}


          onPress={()=>{


            if(pagina > 0){

              setPagina(pagina - 1);

            }


          }}

        >

          <Text style={styles.textoBotao}>
            Anterior
          </Text>


        </Pressable>





        <Text style={styles.numeroPagina}>
          Página {pagina + 1}
        </Text>





        <Pressable

          style={styles.botaoPagina}


          onPress={()=>{


            setPagina(pagina + 1);


          }}

        >

          <Text style={styles.textoBotao}>
            Próxima
          </Text>


        </Pressable>



      </View>






      <Pressable

        style={styles.botaoMenu}


        onPress={()=>{


          router.push("/");


        }}

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

    padding:20,

    backgroundColor:"#fff"

  },



  titulo:{

    fontSize:28,

    fontWeight:"bold",

    color:"#000",

    marginBottom:20

  },



  lista:{

    flex:1

  },



  card:{

    padding:20,

    backgroundColor:"#f1f5f9",

    borderRadius:10,

    marginBottom:10

  },



  nome:{

    fontSize:20,

    fontWeight:"bold",

    color:"#000",

    marginBottom:8

  },



  texto:{

    fontSize:16,

    color:"#333",

    marginTop:3

  },



  vazio:{

    textAlign:"center",

    marginTop:50,

    fontSize:18,

    color:"#000"

  },



  paginacao:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingVertical:15

  },



  botaoPagina:{

    backgroundColor:"#2563eb",

    paddingVertical:12,

    paddingHorizontal:20,

    borderRadius:10

  },



  botaoMenu:{

    backgroundColor:"#64748b",

    padding:15,

    borderRadius:10,

    marginBottom:10,

    alignItems:"center"

  },



  textoBotao:{

    color:"#fff",

    fontWeight:"bold"

  },



  numeroPagina:{

    fontSize:16,

    fontWeight:"bold",

    color:"#000"

  }


});