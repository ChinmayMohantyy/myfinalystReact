import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";

export default function App() {
    const [Show, setShow] = useState(true)
    const [Name, setName] = useState({})
    const [temp, setTemp] = useState([])
    console.log(Name,'changessd')
    console.log(temp,'ryan here')
    
    useEffect(() => {
        const obj = Object.values(Name)
        const headers = arr.filter(item => !obj.includes(item))
        console.log(headers,'obg')
        setTemp(headers)

    }, [Name])

    const arr = [null,'dog','cat','pig','bat','cow','rat','eat']

    function handleChange(e){
        console.log(e.target.value,'changed')
        setName({...Name,[e.target.name]:e.target.value})
        console.log(Name)
    }
    // function handleSelect (e){
    //     console.log(e.target.value,'changed')
    //     setName({...Name,[e.target.name]:e.target.value})
    //     console.log(Name)
    // }



  const [type, setType] = useState(" ");
  return (
    <div className="App" style={{display:'flex'}}>
        <div>

            <Form.Group controlId="formBasicSelect">
                <Form.Label>Select Norm Type</Form.Label>
                <Form.Control as="select" name='one' onChange={handleChange}>
                    
                    {arr.map((obj,i)=>{
                        return(
                            <option key={i}>{obj}</option>
                        )
                    })

                    }
                </Form.Control>
            </Form.Group>
        </div>
        <div>

            <Form.Group controlId="formBasicSelect">
                <Form.Label>Select Norm Type</Form.Label>
                <Form.Control as="select" name='two' onChange={handleChange}>
                    {arr.map((obj)=>{
                        return(
                            <option>{obj}</option>
                        )
                    })

                    }
                </Form.Control>
            </Form.Group>
        </div>
        {/* <div>

            <Form.Group controlId="formBasicSelect">
                <Form.Label>Select Norm Type</Form.Label>
                <Form.Control as="select" >
                    {headers.map((obj)=>{
                        return(
                            <option>{obj}</option>
                        )
                    })

                    }
                </Form.Control>
            </Form.Group>
        </div> */}

    </div>
  );
}
