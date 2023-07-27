import {useEffect, useState} from 'react';
import {auth, storage, db} from './firebase.js';
import firebase from '/node_modules/firebase/package.json';
import { serverTimestamp } from "firebase/firestore";

function Header(props){
    

    const [progress, setProgress] = useState(0);

    const [file, setFile] = useState(null);

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
            // window.location.href = "/";
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

    function abrirModalUpload (e){
        e.preventDefault();

        let modal = document.querySelector('.modalUpload');
        modal.style.display = 'block';
    }

    function fecharModalUpload(){
        

        let modal = document.querySelector('.modalUpload');
        modal.style.display = 'none';
    }

    function deslogar(e){
        e.preventDefault();
        auth.signOut().then(function(val){
            props.setUser(null);
            // window.location.href = "/";
        })
    }

    function uploadPost (e){
        e.preventDefault();
        
        let tituloPost = document.getElementById('titulo-upload').value;
        let progressEl = document.getElementById('progress-upload').value;


        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            setProgress(progress);
        },(error)=>{

        },()=>{

            storage.ref('images').child(file.name).getDownloadURL()
            .then(function(url){
                db.collection('posts').add({
                    titulo: tituloPost,
                    image: url,
                    username: props.user,
                    timestamp: serverTimestamp()
                })

                setProgress(0);
                setFile(null);

                alert('Upload concluído!');

                document.getElementById('form-upload').reset();
                fecharModalUpload();
            })

        })
    }

    return(
        <div className='header'>

            <div className='modalCriarConta'>
                <div className='formCriarConta'>
                    <div onClick={()=>fecharModalCriarConta()}className='close-modal-criar'>X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e)=>CriarConta(e)}>
                        <input id='username-cadastro' type='text' placeholder='Seu username...' />
                        <input id='email-cadastro' type='text' placeholder='Seu e-mail...' />
                        <input id='senha-cadastro'type='password' placeholder='Sua senha...'/>
                        <input type='submit' value='Criar Conta!'/>

                        
                    </form>
                </div>
            </div>

            <div className='modalUpload'>
                <div className='formUpload'>
                    <div onClick={()=>fecharModalUpload()}className='close-modal-criar'>X</div>
                    <h2>Fazer Upload</h2>
                    <form id='form-upload'onSubmit={(e)=>uploadPost(e)}>
                        <progress id='progress-upload'value={progress}></progress>
                        <input id='titulo-upload' type='text' placeholder='Nome da sua foto...' />
                        <input onChange={(e)=>setFile(e.target.files[0])} type='file' name='File' />
                        
                        <input type='submit' value='Publicar'/>

                        
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
                    <a id='Postar-Conteudo'onClick={(e)=>abrirModalUpload(e)}href='#'>Postar!</a>
                    <a id='Logout'onClick={(e)=>deslogar(e)}>Deslogar</a>
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
