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
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */
  
  const usersId = await fetchUserIds();

  const onlineUsersPromise = await Promise.all(usersId.map(async (id)  => {
    const user = await checkStatus(id);
    if(user.status === "online") return id
  }))

  
  const usersEmailSended = await Promise.all(onlineUsersPromise.map(async (id) => {
    if (!id) return;
    const isEmailSended = await sendEmail(id);
    if(isEmailSended) return id;
  }))

  const userFiltered = usersEmailSended.filter((val) => !!val)

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {
              userFiltered.map(userId => <li key={userId}>{ userId }</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
