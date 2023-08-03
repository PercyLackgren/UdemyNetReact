import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activitity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activitity => setActivity(activitity!))
    }, [id, loadActivity])

    function handleSubmit() {
        if (!activitity.id) {
            activitity.id = uuid();
            createActivity(activitity).then(() => navigate(`/activities/${activitity.id}`))
        } else {
            updateActivity(activitity).then(() => navigate(`/activities/${activitity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activitity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponents content='Loading activity...'/>

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
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' value={activitity.title} name='title' onChange={handleInputChange}/>
            </Form>
        </Segment>
    )
})