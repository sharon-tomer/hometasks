import { forwardRef, useState } from 'react';
import { ColumnTask } from '../../types';
import './Task.css';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

const Card = styled.div<{ $isCompact: boolean;}>`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    height: ${props => props.$isCompact ? '60px' : 'auto'};
    min-height: 60px;
    border: 1px solid #cccccc;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 12px;
    margin: 6px;
    text-align: left;
    border: none;
    border-radius: 5px;
    &:hover {
        transform: scale(1.02);
    }
`;

const Header = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    margin-top: 6px;
    padding: 0 12px;
`;

const Content = styled.div<{ $isCompact: boolean;}>`
    display: ${props => props.$isCompact ? 'none' : 'block'};
    padding: 0 12px;
    /* overflow: auto; */

`
const Title = styled.div`
    font-size: calc(6px + 2vmin);
    color: #000000;
`;

const Assignee = styled.div`
    font-size: calc(6px + 1vmin);
    color: #000000;
`;

const Description = styled.div`
    color: #000000;
`;

function Task(task: ColumnTask, ref: React.LegacyRef<HTMLDivElement>) {
    const [isCompact, setIsCompact] = useState(true);

    function toggleIsCompact() {
        setIsCompact(!isCompact);
    }

    return (
        <Draggable draggableId={`${task.id}`} index={task.index}>
            {(provided) => (
                <Card 
                    ref={provided.innerRef}
                    onClick={toggleIsCompact}
                    $isCompact={isCompact}
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps}>
                        <Header>
                            <Title className="title">
                                {task.title}
                            </Title>
                            <Assignee className='assignee'>
                                {task.assignee}
                            </Assignee>
                        </Header>

                        <Content $isCompact={isCompact}>
                            <Description>
                                {task.content}
                            </Description>
                            {
                                task.completeBy ? 
                                    <div> { task.completeBy?.fromNow() } </div> : 
                                    ''
                            }
                        </Content>

                </Card>
            )}
        </Draggable>
    );
}

export default styled(forwardRef(Task))``;