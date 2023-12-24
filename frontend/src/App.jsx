import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router } from 'react-router-dom'

/** Contexts **/
import { AuthProvider } from "./contexts/AuthProvider";

/** Hooks **/
import useAuth from "./hooks/useAuth";

/** Components **/
import Navbar from './components/Navbar'
import IdeaList from './components/IdeaList'
import LoginForm from './components/LoginForm'

/** Pages **/
import { NoMatch } from './pages/no-match'
import { Home } from './pages/Home';

/** API **/
import { setIdeaJSON } from './api/ideas/setIdea';
import { getIdeasJSON } from './api/ideas/getIdeas';

/** CSS **/
import './App.css'


const ideasReducer = (state, action) => {
    switch (action.type) {
    case "IDEAS_FETCH_INIT":
        return {
            ...state,
            isLoading: true,
            isError: false,
        };
    case "IDEAS_FETCH_SUCCESS":
        return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload.list || [],
        };
    case "IDEAS_FETCH_FAILURE":
        return {
            ...state,
            isLoading: false,
            isError: true,
        };
    case 'SET_IDEA':
        return { ...state, data: action.payload };
    default:
        throw new Error();
    }
};

const App = () => {

    const {auth, signOut} = useAuth();
    const [ideas, dispatchIdeas] = React.useReducer(ideasReducer, {
        data: [],
        isLoading: false,
        isError: false,
    });
    const onSubmitIdea = (idea) => {
        setIdeaJSON({
            id: uuidv4(),
            created_at: idea.date,
            title: idea.title,
            description: idea.description,
            points: idea.points,
            state: idea.state,
        }).then((response) => {
            console.log(response);
            toast.success("Idea Submitted")
            dispatchIdeas({
                type: 'SET_IDEA', payload: [...ideas.data, {
                    id: uuidv4(),
                    created_at: idea.date,
                    title: idea.title,
                    description: idea.description,
                    points: idea.points,
                    state: idea.state,
                }]
            });
        }
        ).catch((error) => {
            console.log(error);
            toast.error("An Error Occured")
        });
    }

    const handleFetchIdeas = React.useCallback(async () => {
        dispatchIdeas({ type: "IDEAS_FETCH_INIT" });
        try {
            getIdeasJSON().then((response) => {
                dispatchIdeas({
                    type: "IDEAS_FETCH_SUCCESS",
                    payload: {
                        list: response,
                    },
                });
            }).catch((error) => {
                console.log(error);
                dispatchIdeas({ type: "IDEAS_FETCH_FAILURE" });
            });
        } catch {
            dispatchIdeas({ type: "IDEAS_FETCH_FAILURE" });
        }
    }, []);

    const pendingIdeas = ideas.data.filter((idea) => idea.state !== 'done')
    const completedIdeas = ideas.data.filter((idea) => idea.state === 'done')

    useEffect(() => {
        handleFetchIdeas();
    }, [handleFetchIdeas]);

    return (
        <>
            <Router>
                <AuthProvider>
                    <Toaster />
                    <Navbar auth={auth} signOut={signOut}/>

                    <main style={{ padding: '16px' }}>
                        <Routes>
                            <Route exact path="/" element={<Home ideas={ideas}/>} />
                            <Route path="/pending-ideas" element={<IdeaList ideas={pendingIdeas} onSubmitIdea={onSubmitIdea}/>} />
                            <Route path="/completed-ideas" element={<IdeaList ideas={completedIdeas} onSubmitIdea={onSubmitIdea}/>} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/profile" element={<div>Profile</div>} />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </main>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App
