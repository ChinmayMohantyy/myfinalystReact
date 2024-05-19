import React from 'react'
import styled from 'styled-components';



const Button = styled.input.attrs({type: "submit"})`
    width: 100%;
    /* background-color: ${props => props.disable ? "#03565a98" : '#03565A' };  */
    background-color: ${props => props.variant === 'secondary' ? "transparent" : props.disable ? "#03565a98" : '#03565A'  }; 
    color: ${props => props.variant === 'secondary' ? "#03565A" : 'white'};
    /* padding:  23px 15px; */
    padding:   ${props => props.sm ? "10px 10px" : '23px 15px' };
    font-size: 17px;
    font-family: inherit;
    margin:  ${props => props.npad ? "0" : '10px 0' };
    border: ${props => props.variant === 'secondary' ? "2px solid #03565A" : '2px solid transparent'};
    border-radius: 6px;
    font-weight:600;

    :hover{
        background-color: ${props => props.variant === 'secondary' ? props.disable ? "grey" : "white" : props.disable ? "#03565a98" : "#023b3e"  };
        color: ${props => props.variant === 'secondary' ? '#03565A' :  (props.disable ? "white" : "white")  }; 
        /* border: ${props => props.variant ===  'secondary' ?  '2px solid white' : null }; */
        box-shadow: 5px 5px 5px gray;
        text-shadow:${props => props.variant === 'secondary' ? props.disable ? "" : "" : props.disable ? "" : "2px 2px 4px #000000"  }; ;
    }
`



export const Submit = ({disable,value, sm, variant }) => {
    return (<Button type="submit" value={value} disable={disable}  sm={sm} npad variant={variant} />)
}
