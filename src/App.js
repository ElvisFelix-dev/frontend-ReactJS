import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
           setProjects(response.data); 
        })
    }, []);

    // useState retorna um array com 2 posições
    //
    // 1. Variável com o seu valor inicial
    // 2. função para atualizarmos esse valor

    async function handleAddProject() {
        //projects.push(`Novo Projeto ${Date.now()}`);
        
        //setProjects([...projects, `Novo Projeto ${Date.now()}` ]);

        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
	        owner: "Elvis Felix"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (

        <>
            <Header title="Homepage"/>

            <ul>
                {projects.map(projects => <li key={projects.id}> {projects.title} </li> )}
            </ul>

            <button type="button" onClick={handleAddProject} >Adicionar projeto</button>
        </>
    )
}

export default App;