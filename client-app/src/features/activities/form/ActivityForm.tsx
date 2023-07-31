import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activitity, setActivity] = useState(initialState);

    function handleSubmit() {
        activitity.id ? updateActivity(activitity) : createActivity(activitity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activitity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activitity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activitity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activitity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activitity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activitity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activitity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' value={activitity.title} name='title' onChange={handleInputChange}/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' value={activitity.title} name='title' onChange={handleInputChange}/>
            </Form>
        </Segment>
    )
})