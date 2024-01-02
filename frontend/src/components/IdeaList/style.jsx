import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import {styled as styledComponent} from 'styled-components';

const StyledButtonRight = styled(Button)({
    float: 'right',
});

const StyledTableHeadCell = styled(TableCell)({
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
});

const StyledHeadCellDateCreatedAt = styled(StyledTableHeadCell)({
    width: '5%',
    align: 'left',
});

const StyledHeadCellTitle = styled(StyledTableHeadCell)({
    width: '10%',
    align: 'left',
});

const StyledHeadCellDescription = styled(StyledTableHeadCell)({
    width: '20%',
    align: 'left',
    cursor: 'default',
});

const StyledTableCellDescription = styled(TableCell)({
    width: '20%',
    align: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
});

const StyledHeadCellPoints = styled(StyledTableHeadCell)({
    width: '5%',
});

const StyledHeadCellActions = styled(StyledTableHeadCell)({
    width: '10%',
    align: 'right',
});


const IdeasContainer = styledComponent.div`
    margin: 4em auto;
`;

export {
    StyledButtonRight, StyledTableHeadCell, StyledHeadCellDateCreatedAt,
    StyledHeadCellTitle, StyledHeadCellDescription, StyledTableCellDescription,
    StyledHeadCellPoints, StyledHeadCellActions, IdeasContainer
}