import React, {Component} from 'react'
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from "../actions"

function App({ lists, dispatch }) {

  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result
    if (!destination) {
      return
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId, 
        type
      )
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app'>
        <h1>hello</h1>
        <Droppable droppableId='all-lists' direction='horizontal' type='list'>
          {provided => (
            <div style={styles.listsContainer} {...provided.droppableProps} ref={provided.innerRef}>
            {lists.map((list, index) => (
              <TrelloList listID={list.id} key={list.id} title={list.title}  cards={list.cards} index={index}/>
            ))}
            {provided.placeholder}
            <TrelloActionButton list/>
          </div>            
          )}
        </Droppable>

      </div>
    </DragDropContext>
  )
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row"
  }
}
const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps) (App);
