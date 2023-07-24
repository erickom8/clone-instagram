import {useEffect, useState} from 'react';
import {auth} from './firebase.js';


function Header(props){


    useEffect(() => {
        
    },[]);

    function CriarConta(e){
        
        e.preventDefault();
        let email = document.getElementById('email-cadastro').value;
        let username = document.getElementById('username-cadastro').value;
        let senha = document.getElementById('senha-cadastro').value;

        //Criar conta firebase


        auth.createUserWithEmailAndPassword(email,senha)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:username
            })
            alert("Conta Criada com sucesso!")
            let modal = document.querySelector('.modalCriarConta');


            modal.style.display = 'none';
        }).catch((error)=>{
            alert(error.message);
        })
        ;
    }


    function logar(e){
        e.preventDefault();
        
        let email = document.getElementById('email-login').value;
        let senha = document.getElementById('senha-login').value;
        
        auth.signInWithEmailAndPassword(email,senha)
        .then((auth)=>{
            props.setUser(auth.user.displayName);
            alert('Logado com sucesso!');
        }).catch((error)=>{
            alert(error.message);
        })
    
    
    
    }
    
    function abrirModalCriarConta(e){
        e.preventDefault();

        let modal = document.querySelector('.modalCriarConta');
        modal.style.display = 'block';
    }

    function fecharModalCriarConta(){
        

        let modal = document.querySelector('.modalCriarConta');
        modal.style.display = 'none';
    }

    return(
        <div className='header'>

            <div className='modalCriarConta'>
                <div className='formCriarConta'>
                    <div onClick={()=>fecharModalCriarConta()}className='close-modal-criar'>X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e)=>CriarConta(e)}>
                        <input id='email-cadastro' type='text' placeholder='Seu e-mail...' />
                        <input id='username-cadastro' type='text' placeholder='Seu username...' />
                        <input id='senha-cadastro'type='password' placeholder='Sua senha...'/>
                        <input type='submit' value='Criar Conta!'/>

                        
                    </form>
                </div>
            </div>
            <div className='center'>
            <div className='header_logo'>
                <a href=''><img src ='https://logosmarcas.net/wp-content/uploads/2020/04/Instagram-Logo.png' /></a>
            </div>
            {

                (props.user)?
                <div className='header_logadoInfo'>
                    <span>Olá, <b>{props.user}</b></span>
                    <a href='#'>Postar!</a>
                    </div>
                :
                <div className="header_loginform">
                    <form onSubmit={(e)=>logar(e)}>
                    <input id='email-login'type="text" placeholder='Login...'/>
                    <input id='senha-login'type="password" placeholder='Senha...'/>
                    <input type="submit" name='acao' value ='Logar!'/>
                    </form>

                <div className='btn_criarConta'>
                    <a onClick={(e)=> abrirModalCriarConta(e)}href='#'>Criar Conta!</a>
                </div>
            </div>
            }
            
            </div>
        </div>



    )
}

export default Header;
