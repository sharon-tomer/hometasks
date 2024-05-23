import { forwardRef } from 'react';
import { TaskProps } from '../../types';
import './Task.css';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

const Container = styled.div`
    border: 1px solid #cccccc;
    background-color: #ffffff;
    padding: 12px;
    margin: 6px;
    text-align: left;
`;

function Task(task: TaskProps, ref: React.LegacyRef<HTMLDivElement>) {
    return (
        <Draggable draggableId={`${task.id}`} index={task.index}>
            {(provided) => (
                <Container 
                    ref={provided.innerRef} 
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps}>
                        <div className="title">
                            {task.title}
                        </div>
                        <div className="content">
                            {task.content}
                        </div>
                        <div className='assignee'>
                            {task.assignee}
                        </div>
                        {
                            task.completeBy ? 
                                <div> { task.completeBy?.fromNow() } </div> : 
                                ''
                        }
                </Container>
            )}
        </Draggable>
    );
}

export default styled(forwardRef(Task))``;