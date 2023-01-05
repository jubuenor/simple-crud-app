import { Spinner } from 'react-bootstrap';
import './Loading.css'

function Loading(props){
    return ( 
        <>
            {props.show?
                <div className='loading-backdrop'>
                <Spinner animation='border' variant='primary'></Spinner>
                </div>
            :null}
        </>
        );
}
 
export default Loading;