import styled from 'styled-components';
import TopIdeas from '../components/TopIdeas';
import PropTypes from 'prop-types';

/** Hooks **/
import useAuth from "../hooks/useAuth";


const HomeContainer = styled.div`
    margin: 4em auto;
`;

const Home = ({ ideas }) => {
    const { auth } = useAuth();

    const pendingIdeas = ideas.data.filter(idea => idea.state === "pending");
    const closedIdeas = ideas.data.filter(idea => idea.state === "done");

    const sortByPoints = (a, b) => b.points - a.points;
    const sortByCreation = (a, b) => new Date(b.created_at) - new Date(a.created_at);
    const sortByClosure = (a, b) => new Date(b.closed_at) - new Date(a.closed_at);

    return (
        <HomeContainer>
            {auth.token ? (
                <h1>Bienvenue sur la Boîte à Idées, {auth.user}</h1>
            ) : (
                <h1>Bienvenue sur la Boîte à Idées</h1>
            )}
            <section>
                <TopIdeas ideas={pendingIdeas} sortFunction={sortByPoints} title="Top 3 des idées" count={3} />
                <TopIdeas ideas={pendingIdeas} sortFunction={sortByCreation} title="3 dernières créées" count={3} />
                <TopIdeas ideas={closedIdeas} sortFunction={sortByClosure} title="3 dernières idées clôturées" count={3} />
            </section>
        </HomeContainer>
    );
};

Home.propTypes = {
    ideas: PropTypes.object.isRequired,
};

export {Home};