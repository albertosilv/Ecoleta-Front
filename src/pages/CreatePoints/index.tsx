import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import api from '../../service/api'
interface Item {
    id:number,
    title:string,
    image_url:string
}
interface IBGEUFResponse{
    sigla:string;
}
const CreatePoints = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs,setUfs] = useState<string[]>([])

    useEffect(() => {
        api.get('items').then(res => {
                setItems(res.data)
        })
    }, [])
    useEffect(()=>{
        axios.get<IBGEUFResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then(res =>{
            const ufInitials = res.data.map(uf => uf.sigla)
            setUfs(ufInitials)
        })

    },[])
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to='/'>
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>
            <form >
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text" name="name" id="name"></input>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email"></input>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp"></input>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={[-7.2219196, -35.9043105]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-7.2219196, -35.9043105]} />
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor='uf'>Estado (UF)</label>
                            <select name="uf" id="uf">
                                {ufs.map(uf =>{
                                    <option value="0">{uf.sigla}</option>
                                })}
                                
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor='city'>Cidade</label>
                            <select name="city" id="city">
                                <option value="0"> Selecione uma Cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítems de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(e =>(
                                <li key={e.id}>
                                    <img src={e.image_url} alt={e.title} />
                                    <span>{e.title}</span>
                                </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div >
    )
}

export default CreatePoints;