import React, {Component} from 'react'
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext } from 'react-beautiful-dnd'
import { sort } from "../actions"

function App({ lists }) {

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result
    if (!destination) {
      return
    }

    this.props.dispatch (
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app'>
        <h1>hello</h1>
        <div style={styles.listsContainer}>
          {lists.map(list => (
            <TrelloList listID={list.id} key={list.id} title={list.title}  cards={list.cards}/>
          ))}
          <TrelloActionButton list/>
        </div>
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