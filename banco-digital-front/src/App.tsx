import { useEffect, useState } from 'react'

// 1. A Interface (O Contrato)
// Define o formato dos dados que vêm do Java
interface User {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  balance: number;
  email: string;
}

function App() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {

    fetch('http://localhost:8080/users')
      .then(response => response.json()) 
      .then(data => setUsers(data)) 
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []); 

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Banco Digital - Painel de Controle</h1>
      
      <h2>Lista de Usuários</h2>
      
      {}
      <div style={{ display: 'flex', gap: '20px' }}>
        {users.map(user => (
          <div key={user.id} style={{ 
            border: '1px solid #000000ff', 
            padding: '15px', 
            borderRadius: '10px',
            backgroundColor: '#000000ff',
            width: '200px'
          }}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p><strong>Documento:</strong> {user.document}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p style={{ color: 'green', fontSize: '18px' }}>
              R$ {user.balance.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {users.length === 0 && <p>Nenhum usuário encontrado (Ou o Backend está desligado).</p>}
    </div>
  )
}

export default App