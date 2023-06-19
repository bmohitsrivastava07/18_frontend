import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ManageArtGalleryPage = () => {

    const { authState } = useOktaAuth();

    const [changeQuantityOfProductsClick, setChangeQuantityOfProductsClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addProductClickFunction(){
        setChangeQuantityOfProductsClick(false);
        setMessagesClick(false);
    }
    function changeQuantityOfProductsClickFunction(){
        setChangeQuantityOfProductsClick(true);
        setMessagesClick(false);
    }
    function messagesClickFunction(){
        setChangeQuantityOfProductsClick(false);
        setMessagesClick(true);
    }
    if(authState?.accessToken?.claims.userType === undefined){
        return <Navigate to='/login'  />
    }
    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Art Gallery</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addProductClickFunction}className='nav-link active' id='nav-add-art-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-add-art' type='button' role='tab' aria-controls='nav-add-art' 
                            aria-selected='false'
                        >
                            Add new art
                        </button>
                        <button onClick={changeQuantityOfProductsClickFunction}className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' 
                            aria-selected='true'
                        >
                            Change quantity
                        </button>
                        <button onClick={messagesClickFunction}className='nav-link' id='nav-messages-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' 
                            aria-selected='false'
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'> 
                    <div className='tab-pane fade show active' id='nav-add-art' role='tabpanel'
                        aria-labelledby='nav-add-art-tab'>
                            Add new art
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                       {changeQuantityOfProductsClick?<>Change Quantity</>:<></>}
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
                        {messagesClick?<>Admin Messages</>:<></>}
                    </div>
                </div>
            </div>
        </div>
    );
}