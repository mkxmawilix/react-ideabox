import styled from 'styled-components';
import TopIdeas from '../components/TopIdeas';
import PropTypes from 'prop-types';


const HomeContainer = styled.div`
    margin: 4em auto;
`;

const Home = ({ ideas }) => {
    return (
        <HomeContainer>
            <h1>Bienvenue sur la Boîte à Idées</h1>
            <section>
                <TopIdeas ideas={ideas} />
            </section>
        </HomeContainer>
    );
};

Home.propTypes = {
    ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export {Home};