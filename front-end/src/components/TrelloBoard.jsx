import { PureComponent } from "react";
import PropTypes from 'prop-types';
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link, useParams } from "react-router-dom";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const withRouter = WrappedComponent => {
  const WithRouterWrapper = props => {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
  };
  WithRouterWrapper.displayName = `WithRouter(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithRouterWrapper;
};

class TrelloBoard extends PureComponent {
  componentDidMount() {
    const { boardID = '' } = this.props.params || {};
    if (boardID) {
      this.props.dispatch(setActiveBoard(boardID));
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists = {}, cards = {}, boards = {}, params = { boardID: '' } } = this.props;
    const { boardID } = params;
    const board = boards[boardID];
    
    if (!board) {
      return <p>Board not found</p>;
    }

    const listOrder = board.lists || [];

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Link to="/">Go Back</Link>
        <h2>{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardID => cards[cardID]);
                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
                return null;
              })}
              {provided.placeholder}
              <TrelloCreate list />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

TrelloBoard.propTypes = {
  lists: PropTypes.object,
  cards: PropTypes.object,
  boards: PropTypes.object,
  params: PropTypes.shape({
    boardID: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(withRouter(TrelloBoard));
