import React, { useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

/** Hooks **/
import useAuth from "./hooks/useAuth";

/** Components **/
import Navbar from './components/Navbar'
import IdeaList from './components/IdeaList'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm';
import IdeaDetails from './components/IdeaDetails';

/** Pages **/
import { NoMatch } from './pages/no-match'
import { Home } from './pages/Home';
import { UserProfile } from './pages/UserProfile';

/** API **/
import { createIdeaJSON } from './api/ideas/createIdea';
import { getIdeasJSON } from './api/ideas/getIdeas';
import { deleteIdeaJSON } from './api/ideas/deleteIdea';
import { updateIdeaJSON } from './api/ideas/updateIdea';

/** Routes **/
import PrivateRoutes from './services/Routes/PrivateRoutes';

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
    case 'DELETE_IDEA':
        return { ...state, data: action.payload };
    case 'UPDATE_IDEA':
        return { ...state, data: state.data.map((item) => item.id === action.payload.id ? action.payload : item) };
    default:
        throw new Error();
    }
};

const App = () => {

    {/* Auth */}
    const { auth, signOut } = useAuth();

    {/* Ideas */}
    const [ideas, dispatchIdeas] = React.useReducer(ideasReducer, {
        data: [],
        isLoading: false,
        isError: false,
    });
    const onSubmitIdea = useCallback((idea) => {
        createIdeaJSON({
            title: idea.title,
            description: idea.description,
            userId: auth.userId,
        }).then((response) => {
            toast.success("Idea Submitted")
            const { idea } = response;
            dispatchIdeas({
                type: 'SET_IDEA', payload: [...ideas.data, idea]
            });
        }
        ).catch((error) => {
            console.log(error);
            toast.error("An Error Occured")
        });
    }, [dispatchIdeas, ideas.data, auth.userId]);
    const onUpdateIdea = useCallback((idea) => {
        if (idea.userId !== auth.userId) {
            toast.error("Cannot Update Idea You Did Not Create");
            return;
        }
        updateIdeaJSON(idea).then(() => {
            toast.success("Idea Updated");
            dispatchIdeas({ type: 'UPDATE_IDEA', payload: idea });
        }).catch((error) => {
            console.log(error);
            toast.error("An Error Occured")
        });
    }, [dispatchIdeas, auth.userId]);
    const onDeleteIdea = useCallback((idea) => {
        if (idea.state === 'done') {
            toast.error("Cannot Delete Completed Idea");
            return;
        }
        if (idea.userId !== auth.userId) {
            toast.error("Cannot Delete Idea You Did Not Create");
            return;
        }
        deleteIdeaJSON(idea).then(() => {
            toast.success("Idea Deleted");
            const ideasList = ideas.data.filter((item) => item.id !== idea.id);
            dispatchIdeas({ type: 'DELETE_IDEA', payload: ideasList });
        }).catch((error) => {
            console.log(error);
            toast.error("An Error Occured")
        })
    }, [dispatchIdeas, ideas.data, auth.userId]);

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

    {/* Effects */}

    useEffect(() => {
        handleFetchIdeas();
    }, [handleFetchIdeas]);

    return (
        <>
            <Toaster />
            <Navbar signOut={signOut}/>

            <main style={{ padding: '16px' }}>
                <Routes>
                    <Route exact path="/" element={<Home ideas={ideas}/>} />
                    <Route path="/pending-ideas" element={<IdeaList ideas={pendingIdeas} onSubmitIdea={onSubmitIdea} onUpdateIdea={onUpdateIdea} onDeleteIdea={onDeleteIdea}/>} />
                    <Route path="/completed-ideas" element={<IdeaList ideas={completedIdeas} onSubmitIdea={onSubmitIdea}/>} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/idea/:ideaId" element={<IdeaDetails />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </main>
        </>
    );
}

export default App
