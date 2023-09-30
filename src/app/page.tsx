import React, { useState, useEffect } from "react";

const App = async () => {
  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = async (userId: string) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId: string) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };

  /*
    Question 1: 
    Encontre todos os usuários online e envie e-mails para eles. Renderize os usuários para os quais os e-mails foram enviados com sucesso.

    Passo 1: Carregar usuários
    Passo 2: Verificar usuários online
    Passo 3: Enviar e-mail para quem está online
    Passo 4: Renderizar aqueles para os quais o e-mail foi enviado com sucesso
  
  */

    const users = await  fetchUserIds()
   
    const status = await Promise.all(users.map(user => checkStatus(user)))

    const isOnline = status.filter(status => status.status === "online")

    const sendEmailToEmail = await Promise.all(isOnline.map(async (status) => {
      return {...status, "recebeuEmail" : await sendEmail(status.id)}
    }))

    const userEmail = sendEmailToEmail.filter(email => email.recebeuEmail)
  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {
              userEmail && userEmail.map((user) => (
                <li key={user.id}>{user.id}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
