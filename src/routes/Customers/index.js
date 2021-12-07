import {React} from "react";

//components
import ShowAllCustomers from "../../components/showAllCustomers";

//styles
import {Container, Main} from './Form.styles'
//other


const Customers  = ()  => {

	return (
        <Container>  
            <Main>
                <ShowAllCustomers></ShowAllCustomers>
            </Main>
        </Container>
    )
}

export default Customers







