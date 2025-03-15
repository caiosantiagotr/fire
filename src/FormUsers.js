import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from './FirebaseConnection'
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore'
import { UsersList } from './users'

import { signOut } from 'firebase/auth'

export function FormUsers() {
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [cargo, setCargo] = useState("")
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [isEditing, setIsEditing] = useState("");
  const [Ederenço, setEderenço] = useState("")
const[Pais, setPais] = useState("")
const[ Telefone, setTelefone] = useState("")
const [ Estado Civil, setEstadoCivil] = useState("")

  useEffect(() => {

    async function getDados(){

    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          idade: doc.data().idade,
          cargo: doc.data().cargo
         endereço: doc.data().endereço,
         país: doc.data().pais
         relefone: doc.data().telefone,
         estado civil: doc.data(). estado, civil
         
        })
      })

      setUsers(lista);

    })

    }


    getDados();

  }, [])


  async function handleRegister(){
    await addDoc(collection(db, "users"), {
      nome: nome,
      idade: idade,
      cargo: cargo,
      Ederenço: ederenço,
     Pais: país,
     Telefone: telefone,
Estado Civil: estado civil,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setNome("")
      setIdade("")
      setCargo("")
      setEderenço("")
      setPais("")
      setTelefone("")
    setEstadoCivil("")
    })
    .catch((err) => {
      console.log(err)
    })

  }

  function handleToggle(){
    setShowForm(!showForm);
  }


  function editUser(data){
    setNome(data.nome)
    setIdade(data.idade)
    setCargo(data.cargo)
    setIsEditing(data.id);
    setEderenço(data.Ederenço)
   setPais(data.Pais)
   setTelefone(data.Telefone)
  setEstadoCivil(data.EstadoCivil)
  }

  async function handleEditUser(){
    const docRef = doc(db, "users", isEditing)
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
      ederenço: ederenço,
      pais: pais,
      telefone: telefone,
    estado civil: estado civil,
    })

    setNome("")
    setCargo("")
    setIdade("")
    setIsEditing("");
    setEderenço("")
    setPais("")
    setTelefone("")
    setEstadoCivil("")
  }

  async function handleLogout(){
    await signOut(auth);
  } 

 return (
  <View style={styles.container}>
    { showForm && (
      <View>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome..."
          value={nome}
          onChangeText={ (text) => setNome(text) } 
        />

        <Text style={styles.label}>Idade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua idade..."
          value={idade}
          onChangeText={ (text) => setIdade(text) } 
        />

        <Text style={styles.label}>Cargo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu cargo..."
          value={cargo}
          onChangeText={ (text) => setCargo(text) } 
        />
        <Text style={styles.label}>Ederenço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu Ederenço..."
          value={Ederenço}
          onChangeText={ (text) => setEderenço(text) } 
        />
        {isEditing !== "" ? (
          <TouchableOpacity style={styles.button} onPress={handleEditUser}>
            <Text style={styles.buttonText}>Editar usuário</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        )}
      </View>
    )}

    <TouchableOpacity onPress={handleToggle} style={{ marginTop: 8}}>
      <Text style={{ textAlign:"center", color: "#000" }}>
        {showForm ? "Esconder formulário" : "Mostrar formulário"}
      </Text>
    </TouchableOpacity>


    <Text style={{ marginTop: 14, marginLeft: 8, fontSize: 20, color: "#000"}}>
      Usuários:
    </Text>

    <FlatList
      style={styles.list}
      data={users}
      keyExtractor={ (item) => String(item.id) }
      renderItem={ ({ item }) => <UsersList data={item} handleEdit={ (item) => editUser(item) } /> }
    />

    <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
      <Text style={{ color: "#FFF" }}>Sair da conta</Text>
    </TouchableOpacity>

  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
  },
  button:{
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText:{
    padding: 8,
    color: "#FFF",
    textAlign: 'center'
  },
  label:{
    color: "#000", 
    fontSize: 18, 
    marginBottom: 4,
    marginLeft: 8,
  },
  input:{
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  list:{
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  buttonLogout:{
    backgroundColor: 'red',
    alignSelf: "flex-start",
    margin: 14,
    padding: 8,
    borderRadius: 4
  }
})