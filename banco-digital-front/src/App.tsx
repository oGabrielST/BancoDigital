import { useEffect, useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, 
  TextField, Button, Box, Alert, Snackbar, Avatar 
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';

// --- Interfaces e Lógica (Igual ao anterior) ---
interface User {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  balance: number;
  email: string;
  userType: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [value, setValue] = useState('');
  
  // Controle do Alerta (Snackbar)
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  function loadUsers() {
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro:', error));
  }

  useEffect(() => { loadUsers(); }, []);

  async function handleTransfer() {
    const data = {
      value: parseFloat(value),
      senderId: parseInt(senderId),
      receiverId: parseInt(receiverId)
    };

    try {
      const response = await fetch('http://localhost:8080/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        showFeedback("Transferência realizada com sucesso!", 'success');
        loadUsers();
        setValue('');
      } else {
        const errorData = await response.json();
        showFeedback("Erro: " + (errorData.message || "Erro desconhecido"), 'error');
      }
    } catch (error) {
      showFeedback("Erro de conexão com o servidor.", 'error');
    }
  }

  function showFeedback(message: string, type: 'success' | 'error') {
    setAlertMsg(message);
    setAlertSeverity(type);
    setOpenAlert(true);
  }

  // --- O Visual (UI) ---
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: 4 }}>
      {/* Barra Superior (Header) */}
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceWalletIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Banco Digital
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        
        {/* Cartão de Transferência */}
        <Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ color: 'green', mr: 1 }} /> Nova Transferência
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField 
                  fullWidth label="ID Pagador" variant="outlined" type="number"
                  value={senderId} onChange={e => setSenderId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField 
                  fullWidth label="ID Recebedor" variant="outlined" type="number"
                  value={receiverId} onChange={e => setReceiverId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField 
                  fullWidth label="Valor (R$)" variant="outlined" type="number"
                  value={value} onChange={e => setValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button 
                  fullWidth variant="contained" size="large" 
                  onClick={handleTransfer}
                  sx={{ height: '56px', fontWeight: 'bold' }}
                >
                  ENVIAR
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Lista de Clientes */}
        <Typography variant="h5" sx={{ mb: 2, color: '#555' }}>
          Clientes Cadastrados
        </Typography>

        <Grid container spacing={2}>
          {users.map(user => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56, margin: '0 auto 10px' }}>
                    <PersonIcon fontSize='large'/>
                  </Avatar>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 12, mb: 2 }}>
                    {user.email} (ID: {user.id})
                  </Typography>
                  <Typography variant="h5" color={user.balance >= 0 ? "primary" : "error"}>
                    R$ {user.balance.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: '#aaa' }}>
                    {user.userType}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>

      {/* Pop-up de Aviso (Snackbar) */}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;