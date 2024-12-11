import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import { Droppable, Draggable } from 'react-beautiful-dnd'


const TrelloList = ({title, cards, listID, index}) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} style={styles.container}>
            <Droppable droppableId={String(listID)}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h4>{title}</h4>
                  {cards.map((card, index) => (
                    <TrelloCard key={card.id} index={index} text={card.text} id={card.id}/>
                  ))}
                  <TrelloActionButton listID={listID}/>
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: 300,
    padding: 8,
    marginRight: 8,
    height: "100%"
  }
}
export default TrelloList