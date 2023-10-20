import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        axios.get('https://freefakeapi.io/api/posts?limit=6')
            .then((response) => {
                setArticles(response.data);
            })
    };

    const handleAddArticle = async (e) => {
        // J'ai rajouter directement slug picture et user dans la requette car elles sont obligatoire
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://freefakeapi.io/api/posts',
            data: {
                "title": title,
                "content": content,
                "slug": "slug obligatoire",
                "picture": "https://path.to/picture.jpg",
                "user": 5
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data);
            })
    };

    const handleDeleteArticle = async (id) => {
        axios.delete(`https://freefakeapi.io/api/posts/${id}`)
    };

    const handleEditArticle = async (e) => {
        // J'ai rajouter directement slug picture et user dans la requette car elles sont obligatoire
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://freefakeapi.io/api/posts',
            data: {
                "title": title,
                "content": content,
                "slug": "slug obligatoire",
                "picture": "https://path.to/picture.jpg",
                "user": 5
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data);
            })
    };

    return (
        <div className="container mt-5">

            <h2 className="mb-3">{editId ? 'Mettre à jour l\'article' : 'Ajouter un article'}</h2>
            <form onSubmit={editId ? handleEditArticle : handleAddArticle}>
                <div className="form-group">
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" required />
                </div>
                <div className="form-group">
                    <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} placeholder="Contenu" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{editId ? 'Mettre à jour' : 'Ajouter'}</button>
            </form>

            <h1 className="mb-4">Liste des articles</h1>
            {articles.map(article => (
                <div key={article.id} className="card mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{article.title}</h2>
                        <p className="card-text">{article.content}</p>
                        <button className="btn btn-danger mr-2" onClick={() => handleDeleteArticle(article.id)}>Supprimer</button>
                        <button className="btn btn-warning" onClick={() => { setTitle(article.title); setContent(article.content); setEditId(article.id); }}>Éditer</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
