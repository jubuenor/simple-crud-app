import Cookies from 'universal-cookie';
import app from '../app.json';
import axios from 'axios';

const {APIHOST}=app;

const cookies = new Cookies();

export function SessionTime(){
    const now = new Date().getTime();
    const newDate = now + 60*30*1000;
    return new Date(newDate);
}

export function getSession(){
    return cookies.get('_s')!==null? cookies.get('_s'):false;
}

export const fetchUser = async()=>{
    const token=getSession();
    return await axios.get(`${APIHOST}/users/${token}`,);
}

function renewSesion(){
    const session= getSession();
    if(!session) window.location.href='/login';

    cookies.set('_s',session,{
        path:'/',
        expires: SessionTime()
    });
    return session;
}

export const request={
    get:function(services){
        let token = renewSesion();
        return axios.get(`${APIHOST}${services}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    },
    post:function(services,body){
        let token = renewSesion();
        return axios.post(`${APIHOST}${services}`,body,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    },
    put:function(services,body){
        let token = renewSesion();
        return axios.put(`${APIHOST}${services}`,body,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    },
    delete:function(services){
        let token = renewSesion();
        return axios.delete(`${APIHOST}${services}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    },
}

export function logout(){
    cookies.remove('_s');
    window.location.reload();
}