import React, { useEffect } from 'react'

const Balaceicon = (props) => {
    useEffect(() => {

        const dataInput = props.lengthiconData.find((x)=> x.note === props.rowNumber)

        console.log(dataInput,"==================");
        
        if (!dataInput) {
            props.lengthiconData.push({
                note :props.rowNumber
            })
        }
    }, [])
    
  return (
    <>
        <i title='the net difference is not balancing' style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' />
    </>
  )
}

export default Balaceicon
