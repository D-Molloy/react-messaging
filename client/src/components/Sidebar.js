import { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";


export default function Sidebar({ id }) {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState(CONVERSATIONS_KEY)
	const conversationsOpen = activeTab === CONVERSATIONS_KEY

	const closeModal = () => {
		setIsOpen(false)
	}
	return (
		<div style={{ width: "250px" }} className="d-flex flex-column">
			<Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
				<Nav variant="tabs" className="justify-content-center">
					<Nav.Item>
						<Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content className="border-right overflow-auto flex-grow-1">
					<Tab.Pane eventKey={CONVERSATIONS_KEY}><Conversations /></Tab.Pane>
					<Tab.Pane eventKey={CONTACTS_KEY}><Contacts /></Tab.Pane>
				</Tab.Content>
				<div className="p-2 border-top border-right small">
					Your Id: <span className="text-muted">{id}</span>
				</div>
				<Button className="rounded-0" onClick={() => setIsOpen(true)}>
					New {conversationsOpen ? "Conversation" : "Contact"}
				</Button>
			</Tab.Container>
			<Modal show={isOpen} onHide={closeModal}>
				{conversationsOpen ?
					<NewConversationModal closeModal={closeModal} /> :
					<NewContactModal closeModal={closeModal} />}
			</Modal>
		</div>
	)
}
