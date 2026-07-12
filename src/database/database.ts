import * as SQLite from "expo-sqlite";


export async function getDatabase(){

  const db = await SQLite.openDatabaseAsync(
    "tarefas.db"
  );


  await db.execAsync(`

    CREATE TABLE IF NOT EXISTS tarefas (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      titulo TEXT NOT NULL,

      descricao TEXT,

      categoria TEXT,

      status TEXT,

      data TEXT

    );

  `);


  return db;

}

export async function getTarefas(pagina:number){

  const db = await getDatabase();


  const limite = 5;

  const offset = pagina * limite;


  const resultado = await db.getAllAsync(

    `
    SELECT * FROM tarefas
    ORDER BY id DESC
    LIMIT ?
    OFFSET ?
    `,

    [
      limite,
      offset
    ]

  );


  return resultado;

}

export async function getTarefaPorId(id:number){

  const db = await getDatabase();


  const resultado = await db.getAllAsync(

    `
    SELECT * FROM tarefas
    WHERE id = ?
    `,

    [
      id
    ]

  );


  return resultado[0];

}

export async function excluirTarefa(id:number){

  const db = await getDatabase();


  await db.runAsync(

    `
    DELETE FROM tarefas
    WHERE id = ?
    `,

    [
      id
    ]

  );

}

export async function atualizarTarefa(
  id:number,
  titulo:string,
  descricao:string,
  categoria:string
){

  const db = await getDatabase();


  await db.runAsync(

    `
    UPDATE tarefas

    SET
      titulo = ?,
      descricao = ?,
      categoria = ?

    WHERE id = ?

    `,

    [
      titulo,
      descricao,
      categoria,
      id
    ]

  );

}