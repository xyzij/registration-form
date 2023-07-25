import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState ({
    fullName: '',
    email: '',
    dob: '',
    department: '',
    contactNo: ''
  });

  const [error, setError] = useState({
    name: ''
  })

  
  const onChange = (e) => {
    const { value, name } = e.target;


    setForm((state) => ({
      ...state,
      [name]: value
    }));
  }

  const showData = () => {
    console.log('Form', form);
  
  }

  const onSubmit = (e) => {
    e.preventDefault();
    showData(); 
    let hasError = false;
    const newError = {
      fullName: '',
      email: '',
      dob:'',
      department:'',
      contactNo:'',
    };

    if(form.fullName.trim === '') {
      newError.fullName = 'Full Name is Required'
      hasError = true;
    }
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(form.email)){
      newError.email = 'Invalid email format';
    }

    const dobpattern = /^\d{2}-\d{2}-\d{4}$/;
    if(!dobpattern.test(form.dob)) {
      newError.dob = 'Invalid date format (dd-mm-yyyy) '
    }

    if(form.department.trim === '') {
      newError.department = 'Department is Required'
      hasError = true;
    }

    const contactNoPattern = /^\d{10}$/;
    if (!contactNoPattern.test(form.contactNo)) {
      newError.contactNo = 'Contact Number must be 10 digits';
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    } else {
      setError({
        fullName: '',
        email: '',
        dob: '',
        department: '',
        contactNo: '',
      });
    }


     // Data is valid, proceed to submit using Fetch API
     fetch('https://empbacckie.onrender.com/router/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Server response:', data);
        // Do something with the server response if needed
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        // Handle errors if any occur during the fetch request
      });
  };
  
  const handleButtonClick = () => {
    console.log('Button clicked!');
    // You can perform additional actions here when the button is clicked
  };
     
  return (
    <div className="App">
      <header className="App-header">
       <form onSubmit={onSubmit}>
       <h1>Employee Details Form</h1>

       <label>
          Full Name:
          <input required minLength={5} onChange={onChange} name="fullName" value={form.fullName}/>
        </label>
        {!!error.fullName && (
          <div>
            <i>{error.fullName}</i>
          </div>
          )}    

        <label>
          Email:
          <input required onChange={onChange} name="email" value={form.email}/>
        </label>
        {!!error.email && (
          <div>
            <i>{error.email}</i>
          </div>
          )}    

        <label>
          Date of Birth:
          <input required onChange={onChange} name="dob" value={form.dob}/>
        </label>
        {!!error.dob && (
          <div>
            <i>{error.dob}</i>
          </div>
        )}

        <label>
          Department:
          <input required onChange={onChange} name="department" value={form.department}/>
        </label>
        {!!error.department && (
          <div>
            <i>{error.department}</i>
          </div>
        )}

        <label>
          Contact No:
          <input required onChange={onChange} name="contactNo" value={form.contactNo}/>
        </label>
        {!!error.contactNo && (
          <div>
            <i>{error.contactNo}</i>
          </div>
        )}
        

        <div>
           <button onClick={handleButtonClick}>Submit</button>
        </div>

        
       </form>
      </header>
    </div>
  );
}

export default App;
